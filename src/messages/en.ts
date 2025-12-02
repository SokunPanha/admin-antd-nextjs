import common from './en/common';
import dataView from './en/dataView';
import label from './en/label';
import message from './en/message';
import modal from './en/modal';
import permission from './en/permission';
import status from './en/status';
import tableColumn from './en/tableColumn';
import validation from './en/validation';
import menu from './en/menu';
import dashboard from './en/dashboard';

export default {
  common: {...common},
  dataView: {...dataView},
  label: {...label},
  message: {...message},
  modal: {...modal},
  permission: {...permission},
  status: {...status},
  tableColumn: {...tableColumn},
  validation: {...validation},
  menu: {...menu},
  dashboard: {...dashboard},
} as const;