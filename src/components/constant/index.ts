export enum LANGUAGE {
  JP = 0,
  EN = 1
}

export const CONSTANTS = {
  TAB_PATTENT: {
    VALIDATTION: 'validation',
    ABNORMAL: 'abnormal',
    NORMAL: 'normal'
  },
  KEY_PATTENT: 'pattents',
  KEY_CURRENT_FILE: 'current_file',
  KEY_LOCAL_STORAGE_DATA: 'data_event',
  KEY_STORAGE_URL: 'url_storage',
  COLUMN_EXCEL: {
    FIRST: 'A',
    PURPOSE: 'E',
    DESCRIPTION: 'N',
    TEST_STEP: 'AC',
    EXPECT_RESULT: 'AM'
  },
  KEY_VALIDATION: {
    REQUIRED: 'required',
    MAXLENGTH: 'max_length',
    FORMAT: 'format'
  },
  REGEX: {
    TYPE_VALIDATION_REQUIRED: /required|必要/,
    TYPE_VALIDATION_MAX_LENGTH: /maxlength|最大長さ/,
    TYPE_VALIDATION_FORMAT: /format|フォーマット/
  }
}
