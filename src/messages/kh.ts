import common from './kh/common';
import dataView from './kh/dataView';
import label from './kh/label';
import message from './kh/message';
import modal from './kh/modal';
import permission from './kh/permission';
import status from './kh/status';
import tableColumn from './kh/tableColumn';
import validation from './kh/validation';
import menu from './kh/menu';
import dashboard from './kh/dashboard';
import login from './kh/login';

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
  login: {...login},
} as const;
