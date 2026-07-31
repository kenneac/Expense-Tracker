import { Platform } from "react-native";

export const API_URL = Platform.select({
  web: "https://expense-tracker-sj7n.onrender.com/api",
  default: "https://expense-tracker-sj7n.onrender.com/api",
});
