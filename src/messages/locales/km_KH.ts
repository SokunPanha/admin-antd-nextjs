import { createIntl, enUSIntl } from "@ant-design/pro-components";

// Define Khmer translation map
const kmKHLocaleMap = {
  tableForm: {
    search: "ស្វែងរក",
    reset: "កំណត់ឡើងវិញ",
    submit: "បញ្ជូន",
    collapsed: "បង្រួម",
    expand: "ពង្រីក",
    inputPlaceholder: "សូមបញ្ចូលទិន្នន័យ",
  },
  alert: {
    clear: "សម្អាត",
    selected: "ជ្រើសរើស",
    item: "ធាតុ",
  },
  pagination: {
    total: {
      range: "ទំព័រ",
      total: "សរុប",
      item: "ធាតុ",
    },
  },
  form: {
    lightFilter: {
      more: "ច្រើនទៀត",
      clear: "សម្អាត",
      confirm: "យល់ព្រម",
      itemUnit: "ធាតុ",
    },
  },
  tableToolBar: {
    leftPin: "ដាក់ខាងឆ្វេង",
    rightPin: "ដាក់ខាងស្តាំ",
    noPin: "ដោះចេញ",
    reload: "ផ្ទុកឡើងវិញ",
    density: "កម្រាស់",
    export: "នាំចេញ",
    columns: "ជួរឈរ",
    fullScreen: "ពេញអេក្រង់",
  },
};

// Create Khmer intl using Ant Design Pro's helper
export const kmKHIntl = createIntl("km-KH", {
  ...enUSIntl, // fallback for missing keys
  ...kmKHLocaleMap,
});