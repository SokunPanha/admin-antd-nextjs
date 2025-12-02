import common from './kh/common';
import dataView from './kh/dataView';
import label from './kh/label';
import message from './kh/message';
import modal from './kh/modal';
import permission from './kh/permission';
import status from './kh/status';
import tableColumn from './kh/tableColumn';
import validation from './kh/validation';

export default {
  ...common,
  ...dataView,
  ...label,
  ...message,
  ...modal,
  ...permission,
  ...status,
  ...tableColumn,
  ...validation,
} as const;
