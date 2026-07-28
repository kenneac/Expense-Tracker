// styles/auth.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },

  illustration: {
    height: 310,
    width: 300,
    resizeMode: "contain",
    alignSelf: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginVertical: 15,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 6,
  },

  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
    color: COLORS.text,
  },

  verificationInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
    color: COLORS.text,
    width: "100%",
    textAlign: "center",
    letterSpacing: 2,
  },

  errorInput: {
    borderColor: COLORS.expense,
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 16,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  buttonDisabled: {
    opacity: 0.55,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },

  secondaryButtonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  secondaryButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 8,
  },

  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },

  footerText: {
    color: COLORS.text,
    fontSize: 16,
  },

  linkText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },

  verificationContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  verificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
    textAlign: "center",
  },

  // ❌ Error Styles
  errorBox: {
    backgroundColor: "#FFE5E5",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.expense,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  errorText: {
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
  
  fieldErrorText: {
    color: COLORS.expense,
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
  },

  debug: {
    fontSize: 10,
    opacity: 0.5,
    marginTop: 8,
    color: COLORS.textLight,
  },
});
