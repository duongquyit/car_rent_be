import { I18nContext } from 'nestjs-i18n';
import { EN } from 'src/constants/language.constant';

export class ErrorResponse {
  static getError(errorId: string): any;
  static getError(errors: Array<any>): any;
  static getError(args: string | any[]) {
    const i18n: I18nContext = I18nContext.current();

    if (Array.isArray(args)) {
      const myErrors = [];
      args.forEach((item: any) => {
        Object.values(item.constraints).forEach((errorCode) => {
          myErrors.push({
            field: item.property,
            code: i18n.t(`${errorCode}.code_id`, { lang: EN }),
            title: i18n.t(`${errorCode}.title`, { lang: EN }),
            message: i18n.t(`${errorCode}.prod`, {
              args: { field: item.property },
              lang: EN,
            }),
          });
        });
      });

      return {
        error_id: 'CFO',
        code: 'BAD_REQUEST',
        title: 'Request invalid',
        message: 'Input data is invalid!',
        errors: myErrors,
      };
    }

    return {
      error_id: i18n.t(`${args}.code_id`, { lang: EN }),
      code: i18n.t(`${args}.app_code`, { lang: EN }),
      title: i18n.t(`${args}.title`, { lang: EN }),
      message: i18n.t(`${args}.prod`, { lang: EN }),
    };
  }
}
