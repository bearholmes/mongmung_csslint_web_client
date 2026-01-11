/**
 * ConfigImportExport 컴포넌트 단위 테스트
 */

import { renderWithProviders } from '@/test/test-utils';
import type { LintConfig } from '@/types';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfigImportExport } from '../ConfigImportExport';

describe('ConfigImportExport', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should render component correctly', () => {
    renderWithProviders(<ConfigImportExport />);

    expect(screen.getByText('설정 가져오기/내보내기')).toBeInTheDocument();
    expect(screen.getByText('내보내기')).toBeInTheDocument();
    expect(screen.getByText('가져오기')).toBeInTheDocument();
    expect(screen.getByText('JSON 형식 예시')).toBeInTheDocument();
  });

  it('should render export buttons', () => {
    renderWithProviders(<ConfigImportExport />);
    expect(screen.getByText('📥 JSON 파일로 저장')).toBeInTheDocument();
    expect(screen.getByText('📋 클립보드에 복사')).toBeInTheDocument();
  });

  it('should render import buttons', () => {
    renderWithProviders(<ConfigImportExport />);
    expect(screen.getByText('📤 JSON 파일에서 불러오기')).toBeInTheDocument();
    expect(screen.getByText('📋 클립보드에서 불러오기')).toBeInTheDocument();
  });

  it('should show success alert on clipboard copy', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {
      // void
    });
    const writeTextMock = vi.fn().mockResolvedValue(undefined);

    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    renderWithProviders(<ConfigImportExport />);

    const copyButton = screen.getByText('📋 클립보드에 복사');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith('설정이 클립보드에 복사되었습니다.');
    });
  });

  it('should import valid config from clipboard', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {
      // void
    });

    const validConfig: LintConfig = {
      outputStyle: '',
      rules: {
        'color-named': 'never',
        'declaration-no-important': true,
      },
    };

    const readTextMock = vi.fn().mockResolvedValue(JSON.stringify(validConfig));

    Object.assign(navigator, {
      clipboard: {
        readText: readTextMock,
      },
    });

    renderWithProviders(<ConfigImportExport />);

    const pasteButton = screen.getByText('📋 클립보드에서 불러오기');
    fireEvent.click(pasteButton);

    await waitFor(() => {
      expect(readTextMock).toHaveBeenCalled();
      expect(confirmSpy).toHaveBeenCalledWith(
        '클립보드의 설정을 적용하시겠습니까?\n현재 설정은 덮어씌워집니다.'
      );
      expect(alertSpy).toHaveBeenCalledWith('설정을 성공적으로 가져왔습니다.');
    });
  });

  it('should show error for invalid JSON', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {
      // void
    });
    const readTextMock = vi.fn().mockResolvedValue('invalid json');

    Object.assign(navigator, {
      clipboard: {
        readText: readTextMock,
      },
    });

    renderWithProviders(<ConfigImportExport />);

    const pasteButton = screen.getByText('📋 클립보드에서 불러오기');
    fireEvent.click(pasteButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        '올바른 설정 형식이 아닙니다.\nJSON 형식을 확인해주세요.'
      );
    });
  });

  it('should render example JSON section', () => {
    renderWithProviders(<ConfigImportExport />);

    expect(screen.getByText('JSON 형식 예시')).toBeInTheDocument();
  });
});
