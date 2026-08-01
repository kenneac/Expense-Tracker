// styles/auth.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  // Root container — fills available space and centers content both axes.
  // Works inside KeyboardAwareScrollView because it grows with content
  // while still centering when the keyboard is hidden.
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    width: "100%",
    backgroundColor: COLORS.background,
  },

  // Illustration — fixed dimensions so it NEVER collapses due to flex.
  // resizeMode handled in the component (contain) keeps aspect ratio.
  illustration: {
    width: 220,
    height: 220,
    marginBottom: 24,
    resizeMode: "contain",
  },

  // Welcome Back / Create Account title
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 24,
    textAlign: "center",
  },

  // Field labels (used in sign-up)
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    alignSelf: "flex-start",
    marginBottom: 6,
    marginTop: 12,
  },

  // Text inputs — stretch to full width, consistent height, readable padding
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: 12,
  },

  // Verification code input — same base as input, slightly wider letter spacing
  verificationInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 4,
  },

  // Error state applied to inputs when there is an error
  errorInput: {
    borderColor: COLORS.expense,
    borderWidth: 1.5,
  },

  // Primary button — consistent sizing across the app
  button: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    marginBottom: 16,
  },

  // Pressed state — subtle feedback
  buttonPressed: {
    opacity: 0.85,
  },

  // Disabled state — muted appearance
  buttonDisabled: {
    backgroundColor: COLORS.border,
  },

  // Button text
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },

  // Row that holds secondary actions (e.g. "I need a new code" + "Verify")
  secondaryButtonRow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },

  // Secondary (text-style) button
  secondaryButton: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  // Secondary button text
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },

  // Footer — stays centered at the bottom of the form
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    width: "100%",
  },

  // Footer text
  footerText: {
    fontSize: 14,
    color: COLORS.textLight,
  },

  // Link text (Sign up / Sign in)
  linkText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    marginLeft: 6,
  },

  // Verification container — centers content like the main container
  verificationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    width: "100%",
  },

  // Verification title
  verificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 24,
    textAlign: "center",
  },

  // ❌ Error Styles

  // Error box — readable container with icon + message + close
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.expense,
    marginBottom: 16,
    gap: 8,
  },

  // Error text (inside errorBox)
  errorText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.expense,
    fontWeight: "500",
  },

  // Field-level error text (under inputs)
  fieldErrorText: {
    fontSize: 12,
    color: COLORS.expense,
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: -10,
  },

  // Debug helper (unused in production but kept for completeness)
  debug: {
    borderColor: COLORS.border,
    borderWidth: 1,
  },
});