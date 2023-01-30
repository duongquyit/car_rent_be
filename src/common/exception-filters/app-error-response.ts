import { I18nContext } from 'nestjs-i18n';
import { EN } from 'src/constants/language.constant';
import { ErrorDto } from './error.dto';

export class ErrorResponse {
  static getError(errorId: string): any;
  static getError(errors: Array<any>): any;
  static getError(args: string | any[]) {
    const i18n: I18nContext = I18nContext.current();

    if (Array.isArray(args)) {
      const myErrors = [];
      const newErrors = this.flattenValidationErrors(args);
      newErrors.forEach((item: any) => {
        Object.values(item.constraints).forEach((errorCode) => {
          myErrors.push({
            field: item.property,
            code: i18n.t(`${errorCode}.code_id`),
            title: i18n.t(`${errorCode}.title`),
            message: i18n.t(`${errorCode}.prod`, {
              args: { field: item.property },
            }),
          });
        });
      });

      return {
        error_id: i18n.t('system.CFO-0001.code_id'),
        code: i18n.t('system.CFO-0001.app_code'),
        title: i18n.t('system.CFO-0001.title'),
        message: i18n.t('system.CFO-0001.prod'),
        errors: myErrors,
      };
    }

    return {
      error_id: i18n.t(`${args}.code_id`),
      code: i18n.t(`${args}.app_code`),
      title: i18n.t(`${args}.title`),
      message: i18n.t(`${args}.prod`),
    };
  }

  private static flattenValidationErrors(
    validationErrors: ErrorDto[],
  ): ErrorDto[] {
    const errors: ErrorDto[] = [];
    for (const validationError of validationErrors) {
      if (!validationError.children.length) {
        errors.push(validationError);
        continue;
      }
      errors.push(...this.flattenValidationErrors(validationError.children));
    }

    return errors;
  }
}
