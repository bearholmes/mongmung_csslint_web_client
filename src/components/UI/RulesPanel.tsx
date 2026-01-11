/**
 * 린트 규칙 설정 패널 컴포넌트
 * 80+ stylelint 규칙을 카테고리별로 관리하는 UI
 */

import { useAtomValue, useSetAtom } from 'jotai';
import { useDeferredValue, useMemo, useState } from 'react';
import { lintConfigAtom, resetLintConfigAtom, updateRuleAtom } from '@/atoms/lintAtom';
import { EDITABLE_RULES, RULE_CATEGORIES, type RuleCategory } from '@/constants/ruleMetadata';
import styles from './RulesPanel.module.css';
import { RuleToggle } from './RuleToggle';

/**
 * 린트 규칙 커스터마이징 패널
 * - 카테고리별 규칙 표시 (11개 카테고리, 80+ 규칙)
 * - 검색 및 필터 기능 (디바운싱 적용)
 * - localStorage에 자동 저장
 * - 초기화 기능 제공
 *
 * @example
 * ```tsx
 * <RulesPanel />
 * ```
 */
export function RulesPanel() {
  const config = useAtomValue(lintConfigAtom);
  const updateRule = useSetAtom(updateRuleAtom);
  const resetConfig = useSetAtom(resetLintConfigAtom);

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<RuleCategory>>(
    new Set(['quality'])
  );

  /**
   * 디바운싱된 검색어
   * useDeferredValue를 사용하여 검색 입력 시 렌더링 성능 최적화
   */
  const deferredSearchQuery = useDeferredValue(searchQuery);

  /**
   * 검색어에 따라 필터링된 규칙 목록
   */
  const filteredRules = useMemo(() => {
    if (!deferredSearchQuery.trim()) {
      return EDITABLE_RULES;
    }

    const query = deferredSearchQuery.toLowerCase();
    return EDITABLE_RULES.filter(
      (rule) =>
        rule.label.toLowerCase().includes(query) ||
        rule.description.toLowerCase().includes(query) ||
        rule.key.toLowerCase().includes(query)
    );
  }, [deferredSearchQuery]);

  /**
   * 카테고리별로 필터링된 규칙 그룹화
   */
  const rulesByCategory = useMemo(() => {
    const grouped = new Map<RuleCategory, typeof EDITABLE_RULES>();

    for (const rule of filteredRules) {
      const existing = grouped.get(rule.category) ?? [];
      grouped.set(rule.category, [...existing, rule]);
    }

    return grouped;
  }, [filteredRules]);

  const toggleCategory = (category: RuleCategory) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleReset = () => {
    if (window.confirm('모든 규칙을 기본값으로 초기화하시겠습니까?')) {
      resetConfig();
    }
  };

  /**
   * 전체 확장/축소 토글
   */
  const toggleAll = () => {
    if (expandedCategories.size === rulesByCategory.size) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set(rulesByCategory.keys()));
    }
  };

  const totalRules = EDITABLE_RULES.length;
  const matchedRules = filteredRules.length;
  const showSearchResults = searchQuery.trim() !== '';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>린트 규칙 설정</h3>
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          초기화
        </button>
      </div>

      <div className={styles.description}>
        규칙을 커스터마이즈하세요. 설정은 자동으로 저장됩니다.
      </div>

      {/* 검색 입력 */}
      <div className={styles.searchSection}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="규칙 검색 (이름, 설명, 키)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {showSearchResults && (
          <p className={styles.searchResults}>
            {matchedRules}개 규칙 검색됨 (총 {totalRules}개)
          </p>
        )}
      </div>

      {/* 전체 확장/축소 버튼 */}
      <div className={styles.controls}>
        <button type="button" className={styles.controlButton} onClick={toggleAll}>
          {expandedCategories.size === rulesByCategory.size ? '전체 축소' : '전체 확장'}
        </button>
      </div>

      <div className={styles.categories}>
        {Array.from(rulesByCategory.entries()).map(([categoryId, rules]) => {
          const category = RULE_CATEGORIES[categoryId];
          const isExpanded = expandedCategories.has(categoryId);

          return (
            <div key={categoryId} className={styles.category}>
              <button
                type="button"
                className={styles.categoryHeader}
                onClick={() => toggleCategory(categoryId)}
              >
                <span className={styles.categoryIcon}>{isExpanded ? '▼' : '▶'}</span>
                <div className={styles.categoryInfo}>
                  <h4 className={styles.categoryTitle}>{category.label}</h4>
                  <p className={styles.categoryDescription}>{category.description}</p>
                </div>
                <span className={styles.categoryCount}>{rules.length}개 규칙</span>
              </button>

              {isExpanded && (
                <div className={styles.rules}>
                  {rules.map((rule) => (
                    <RuleToggle
                      key={rule.key}
                      rule={rule}
                      value={config.rules[rule.key]}
                      onChange={(value) => updateRule({ key: rule.key, value })}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>💾 설정은 브라우저 로컬 스토리지에 자동으로 저장됩니다.</p>
      </div>
    </div>
  );
}
