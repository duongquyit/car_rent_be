require('dotenv').config({ path: './local/.env.local' });
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const TAB_SIZE = 2;
const START_ROW = 2;
const COL_FILE_NAME = 'Module';
const COL_KEY = 'Key';
const COL_JA = 'JA';
const COL_EN = 'EN';

const COL_CODE_ID = 'Screen ID';
const COL_ERR_MSG_FILE_NAME = 'Level';
const COL_APP_CODE = 'Application code';

const COL_JA_TITLE = 'Error title - Japanese';
const COL_EN_TITLE = 'Error title English';

const COL_ERR_JA_MSG_PROD = 'Error message - Japanese (Production)';
const COL_ERR_EN_MSG_PROD = 'Error message - English (Production)';

const COL_ERR_JA_MSG_INTER = 'Error message internal - Japanese';
const COL_ERR_EN_MSG_INTER = 'Error message internal - English';

convert();

function convert() {
  const [input, output, sheets] = getArgv();
  const workbook = xlsx.readFile(input, { sheets });
  const jsonData = {};

  Object.keys(workbook.Sheets).forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet, { blankrows: true });
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const [fileName, key, ja, en] = transform(sheetName, row, i);

      if (fileName) {
        jsonData[fileName] = jsonData[fileName] || { ja: {}, en: {} };
        jsonData[fileName].ja[key] = ja;
        jsonData[fileName].en[key] = en;
      }

      const [
        codeId,
        msgFileName,
        appCode,
        errorJaTitle,
        errEnTitle,
        errJaMsgProd,
        errEnMsgProd,
        errJaMsgInter,
        errEnMsgInter,
      ] = transformErrMsg(sheetName, row, i);

      if (msgFileName) {
        const fileName = msgFileName.toLowerCase().replaceAll(' ', '-');
        jsonData[fileName] = jsonData[fileName] || { ja: {}, en: {} };
        jsonData[fileName].ja[codeId] = {
          title: errorJaTitle.replaceAll('\n', ''),
          prod: errJaMsgProd.replaceAll('\n', ''),
          inter: errJaMsgInter.replaceAll('\n', ''),
        };
        jsonData[fileName].en[codeId] = {
          title: errEnTitle.replaceAll('\n', ''),
          prod: errEnMsgProd.replaceAll('\n', ''),
          inter: errEnMsgInter.replaceAll('\n', ''),
        };
      }
    }
  });
  Object.keys(jsonData).forEach((fileName) => {
    createJsonFiles(output, fileName, jsonData[fileName]);
  });
}

function transform(sheet, row, index) {
  const fileName = row[COL_FILE_NAME];
  const key = row[COL_KEY];
  const ja = row[COL_JA] || '';
  const en = row[COL_EN] || '';

  const error = (errorAt) =>
    new Error(
      `[Sheet: ${sheet}, Row: ${
        index + START_ROW
      }, Column: ${errorAt}] Must not be empty`,
    );

  switch (true) {
    case !fileName && !key && !ja && !en:
      return [];
    case !key:
      throw error(COL_KEY);
    case !fileName:
      throw error(COL_FILE_NAME);
    case !ja:
      throw error(COL_JA);
    case !en:
      throw error(COL_EN);
    default:
      return [fileName, key, ja, en];
  }
}

function transformErrMsg(sheet, row, index) {
  const fileName = row[COL_ERR_MSG_FILE_NAME];
  const codeId = row[COL_CODE_ID] || '';
  const appCode = row[COL_APP_CODE] || '';
  const errorJaTitle = row[COL_JA_TITLE] || '';
  const errEnTitle = row[COL_EN_TITLE] || '';
  const errJaMsgProd = row[COL_ERR_JA_MSG_PROD] || '';
  const errEnMsgProd = row[COL_ERR_EN_MSG_PROD] || '';
  const errJaMsgInter = row[COL_ERR_JA_MSG_INTER] || '';
  const errEnMsgInter = row[COL_ERR_EN_MSG_INTER] || '';

  const error = (errorAt) =>
    new Error(
      `[Sheet: ${sheet}, Row: ${
        index + START_ROW
      }, Column: ${errorAt}] Must not be empty`,
    );

  switch (true) {
    case !fileName &&
      !appCode &&
      !errorJaTitle &&
      !errEnTitle &&
      !errJaMsgProd &&
      !errEnMsgProd &&
      !errJaMsgInter &&
      !errJaMsgInter:
      return [];
    case !fileName:
      console.log(fileName);
      throw error(COL_ERR_MSG_FILE_NAME);
    case !appCode:
      throw error(COL_APP_CODE);
    case !errorJaTitle:
      throw error(COL_JA_TITLE);
    case !errEnTitle:
      throw error(COL_EN_TITLE);
    case !errJaMsgProd:
      throw error(COL_ERR_JA_MSG_PROD);
    case !errEnMsgProd:
      throw error(COL_ERR_EN_MSG_PROD);
    case !errJaMsgInter:
      throw error(COL_ERR_JA_MSG_INTER);
    case !errEnMsgInter:
      throw error(COL_ERR_EN_MSG_INTER);
    default:
      return [
        codeId,
        fileName,
        appCode,
        errorJaTitle,
        errEnTitle,
        errJaMsgProd,
        errEnMsgProd,
        errJaMsgInter,
        errEnMsgInter,
      ];
  }
}

function getArgv() {
  console.log(process.env.I18N_SHEETS);
  console.log(process.env.I18N_INPUT);
  console.log(process.env.I18N_OUTPUT);
  const input = process.env.I18N_INPUT;
  const output = process.env.I18N_OUTPUT;
  const sheets = process.env.I18N_SHEETS.split(',');

  if (!input) {
    throw new Error('Please enter the path to the xlsx file with I18N_INPUT');
  }
  if (!output) {
    throw new Error('Please enter the path to the output dir with I18N_OUTPUT');
  }
  if (!sheets) {
    throw new Error('Please enter the list of sheet with I18N_SHEETS');
  }

  return [input, output, sheets];
}

function createJsonFiles(output, fileName, jsonData) {
  const { ja, en } = jsonData;
  const jaFilePath = path.resolve(output, 'ja', `${fileName}.json`);
  const enFilePath = path.resolve(output, 'en', `${fileName}.json`);
  fs.writeFile(
    jaFilePath,
    `${JSON.stringify(ja, null, TAB_SIZE)}\n`,
    (error) => {
      if (error) {
        throw error;
      }
      /* eslint-disable no-console */
      console.log(`Completed: ${jaFilePath}`);
    },
  );
  fs.writeFile(
    enFilePath,
    `${JSON.stringify(en, null, TAB_SIZE)}\n`,
    (error) => {
      if (error) {
        throw error;
      }
      /* eslint-disable no-console */
      console.log(`Completed: ${enFilePath}`);
    },
  );
}
