/**
 * PresetManager 컴포넌트 단위 테스트
 */

import { renderWithProviders } from '@/test/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PresetManager } from '../PresetManager';

describe('PresetManager', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {
      // no-op for jsdom
    });
  });

  it('should render component correctly', () => {
    renderWithProviders(<PresetManager />);
    expect(screen.getByText('프리셋 관리')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('프리셋 이름...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '프리셋 저장' })).toBeInTheDocument();
  });

  it('should save new preset', () => {
    renderWithProviders(<PresetManager />);

    const input = screen.getByPlaceholderText('프리셋 이름...');
    const saveButton = screen.getByRole('button', { name: '프리셋 저장' });

    fireEvent.change(input, { target: { value: 'My Preset' } });
    fireEvent.click(saveButton);

    expect(screen.getByText('My Preset')).toBeInTheDocument();
  });

  it('should show alert for empty name', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {
      // void
    });
    renderWithProviders(<PresetManager />);

    const saveButton = screen.getByRole('button', { name: '프리셋 저장' });
    fireEvent.click(saveButton);

    expect(alertSpy).toHaveBeenCalledWith('프리셋 이름을 입력하세요.');
  });

  it('should save on Enter key', () => {
    renderWithProviders(<PresetManager />);

    const input = screen.getByPlaceholderText('프리셋 이름...');
    fireEvent.change(input, { target: { value: 'Enter Key Preset' } });

    // Submit the form by pressing Enter
    fireEvent.submit(input.closest('form') as HTMLFormElement);

    // Verify the preset was created
    expect(screen.getByText('Enter Key Preset')).toBeInTheDocument();
  });

  it('should prevent duplicate preset names', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {
      // void
    });
    renderWithProviders(<PresetManager />);

    const input = screen.getByPlaceholderText('프리셋 이름...');
    const saveButton = screen.getByRole('button', { name: '프리셋 저장' });

    // Save first preset
    fireEvent.change(input, { target: { value: 'Duplicate Name' } });
    fireEvent.click(saveButton);

    // Try to save duplicate
    fireEvent.change(input, { target: { value: 'Duplicate Name' } });
    fireEvent.click(saveButton);

    expect(alertSpy).toHaveBeenCalledWith(
      '이미 존재하는 프리셋 이름입니다. 다른 이름을 사용해주세요.'
    );
  });

  it('should load preset when confirmed', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderWithProviders(<PresetManager />);

    // Save a preset first
    const input = screen.getByPlaceholderText('프리셋 이름...');
    fireEvent.change(input, { target: { value: 'Test Preset' } });
    fireEvent.click(screen.getByRole('button', { name: '프리셋 저장' }));

    // Load the preset
    const loadButton = screen.getByRole('button', { name: 'Test Preset 프리셋 불러오기' });
    fireEvent.click(loadButton);

    expect(confirmSpy).toHaveBeenCalledWith('현재 설정을 이 프리셋으로 변경하시겠습니까?');
  });

  it('should not load preset when cancelled', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
    renderWithProviders(<PresetManager />);

    // Save a preset first
    const input = screen.getByPlaceholderText('프리셋 이름...');
    fireEvent.change(input, { target: { value: 'Test Preset' } });
    fireEvent.click(screen.getByRole('button', { name: '프리셋 저장' }));

    // Try to load but cancel
    const loadButton = screen.getByRole('button', { name: 'Test Preset 프리셋 불러오기' });
    fireEvent.click(loadButton);

    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should delete preset when confirmed', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderWithProviders(<PresetManager />);

    // Save a preset first
    const input = screen.getByPlaceholderText('프리셋 이름...');
    fireEvent.change(input, { target: { value: 'To Delete' } });
    fireEvent.click(screen.getByRole('button', { name: '프리셋 저장' }));

    expect(screen.getByText('To Delete')).toBeInTheDocument();

    // Delete the preset
    const deleteButton = screen.getByRole('button', { name: 'To Delete 프리셋 삭제' });
    fireEvent.click(deleteButton);

    expect(confirmSpy).toHaveBeenCalledWith('이 프리셋을 삭제하시겠습니까?');
    expect(screen.queryByText('To Delete')).not.toBeInTheDocument();
  });

  it('should rename preset', () => {
    renderWithProviders(<PresetManager />);

    // Save a preset first
    const input = screen.getByPlaceholderText('프리셋 이름...');
    fireEvent.change(input, { target: { value: 'Original Name' } });
    fireEvent.click(screen.getByRole('button', { name: '프리셋 저장' }));

    // Start editing
    const renameButton = screen.getByRole('button', { name: 'Original Name 프리셋 이름 변경' });
    fireEvent.click(renameButton);

    // Change name
    const editInput = screen.getByLabelText('프리셋 이름 변경: Original Name');
    fireEvent.change(editInput, { target: { value: 'New Name' } });
    fireEvent.click(screen.getByRole('button', { name: '변경 확인' }));

    expect(screen.getByText('New Name')).toBeInTheDocument();
    expect(screen.queryByText('Original Name')).not.toBeInTheDocument();
  });

  it('should cancel rename on Escape key', () => {
    renderWithProviders(<PresetManager />);

    // Save a preset first
    const input = screen.getByPlaceholderText('프리셋 이름...');
    fireEvent.change(input, { target: { value: 'Original Name' } });
    fireEvent.click(screen.getByRole('button', { name: '프리셋 저장' }));

    // Start editing
    const renameButton = screen.getByRole('button', { name: 'Original Name 프리셋 이름 변경' });
    fireEvent.click(renameButton);

    // Press Escape
    const editInput = screen.getByLabelText('프리셋 이름 변경: Original Name');
    fireEvent.keyDown(editInput, { key: 'Escape' });

    // Should still show original name
    expect(screen.getByText('Original Name')).toBeInTheDocument();
  });

  it('should prevent empty name during rename', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {
      // void
    });
    renderWithProviders(<PresetManager />);

    // Save a preset first
    const input = screen.getByPlaceholderText('프리셋 이름...');
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(screen.getByRole('button', { name: '프리셋 저장' }));

    // Start editing
    const renameButton = screen.getByRole('button', { name: 'Test 프리셋 이름 변경' });
    fireEvent.click(renameButton);

    // Try to save empty name
    const editInput = screen.getByLabelText('프리셋 이름 변경: Test');
    fireEvent.change(editInput, { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: '변경 확인' }));

    expect(alertSpy).toHaveBeenCalledWith('프리셋 이름을 입력하세요.');
  });

  it('should prevent duplicate names during rename', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {
      // void
    });
    renderWithProviders(<PresetManager />);

    const input = screen.getByPlaceholderText('프리셋 이름...');

    // Save two presets
    fireEvent.change(input, { target: { value: 'Preset 1' } });
    fireEvent.click(screen.getByRole('button', { name: '프리셋 저장' }));

    fireEvent.change(input, { target: { value: 'Preset 2' } });
    fireEvent.click(screen.getByRole('button', { name: '프리셋 저장' }));

    // Try to rename Preset 2 to Preset 1
    const renameButton = screen.getByRole('button', { name: 'Preset 2 프리셋 이름 변경' });
    fireEvent.click(renameButton);

    const editInput = screen.getByLabelText('프리셋 이름 변경: Preset 2');
    fireEvent.change(editInput, { target: { value: 'Preset 1' } });
    fireEvent.click(screen.getByRole('button', { name: '변경 확인' }));

    expect(alertSpy).toHaveBeenCalledWith(
      '이미 존재하는 프리셋 이름입니다. 다른 이름을 사용해주세요.'
    );
  });
});
