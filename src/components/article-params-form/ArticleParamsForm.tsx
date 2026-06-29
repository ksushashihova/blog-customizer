import {
  useState,
  useRef,
  useEffect,
  FormEvent,
} from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  type ArticleStateType,
  type OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
  initialArticleState: ArticleStateType;
  initialPageState: ArticleStateType;    
  onApply: (nextState: ArticleStateType) => void;
  onReset: () => void;
};

export const ArticleParamsForm = ({
  initialArticleState,
  initialPageState,
  onApply,
  onReset,
}: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);


  const [draftState, setDraftState] = useState<ArticleStateType>(
    initialArticleState,
  );


  const rootRef = useRef<HTMLDivElement | null>(null);

const handleArrowClick = () => {
  setIsOpen((prev) => !prev);
};

useEffect(() => {
  if (!isOpen) {
    return;
  }

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as Node | null;

    if (!rootRef.current || !target) {
      return;
    }

    if (rootRef.current.contains(target)) {
      return;
    }

    setIsOpen(false);
  };

  window.addEventListener('mousedown', handleDocumentClick);

  return () => {
    window.removeEventListener('mousedown', handleDocumentClick);
  };
}, [isOpen]);

  


  const asideClassName = clsx(
    styles.container,
    isOpen && styles.container_open,
  );


  const handleSelectChange = (
    field: keyof ArticleStateType,
    selectedOption: OptionType,
  ) => {
    setDraftState((prev) => ({
      ...prev,
      [field]: selectedOption,
    }));
  };


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply(draftState);
    setIsOpen(false);
  };


  const handleResetClick = () => {
    setDraftState(initialPageState);
    onReset();
    setIsOpen(false);
  };
  return (
    <div ref={rootRef}>
      <ArrowButton
        isOpen={isOpen}
        onClick={handleArrowClick}
      />
      <aside className={asideClassName}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.titleDescription}>Задайте параметры</h2>
          <div className={styles.field}>
            <span className={styles.label}></span>
            <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={draftState.fontFamilyOption}
            onChange={(selected: OptionType) =>
            handleSelectChange('fontFamilyOption', selected)
            }
            />
            </div>
          <div className={styles.field}>
            <RadioGroup
              selected={draftState.fontSizeOption}
              name="font-size"
              onChange={(selected: OptionType) =>
                handleSelectChange('fontSizeOption', selected)
              }
              options={fontSizeOptions}
              title="Размер шрифта"
            />
          </div>
            <div className={styles.field}>
              <Select
                title="Цвет шрифта"
                options={fontColors}
                selected={draftState.fontColor}
                onChange={(selected: OptionType) =>
                  handleSelectChange('fontColor', selected)
                }
              />
            </div>
            <Separator/>
            <div className={styles.field}>
              <Select
                title="Цвет фона"
                options={backgroundColors}
                selected={draftState.backgroundColor}
                onChange={(selected: OptionType) =>
                  handleSelectChange('backgroundColor', selected)
                }
              />
            </div>
            <div className={styles.field}>
              <Select
                title="Ширина контента"
                options={contentWidthArr}
                selected={draftState.contentWidth}
                onChange={(selected: OptionType) =>
                  handleSelectChange('contentWidth', selected)
                }
              />
            </div>
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="button"
              type="clear"
              onClick={handleResetClick}
            />
            <Button
              title="Применить"
              htmlType="submit"
              type="apply"
            />
          </div>
        </form>
      </aside>
    </div>
  );
  };


