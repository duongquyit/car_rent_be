export default {
  convertToTimeZoneISOString: (datetime: string | Date): string | Date => {
    const date = new Date(datetime);
    const localISODatetime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    ).toISOString();

    return localISODatetime;
  },
};
