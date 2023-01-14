import { I18nContext } from 'nestjs-i18n';
import { EN } from 'src/constants/language.constant';

export const handFormatError = (exception: any, i18n: I18nContext) => {
  return {
    error_id: i18n.t(`${exception.message}.code_id`, { lang: EN }),
    code: i18n.t(`${exception.message}.app_code`, { lang: EN }),
    title: i18n.t(`${exception.message}.title`, { lang: EN }),
    message: i18n.t(`${exception.message}.prod`, { lang: EN }),
  };
};
