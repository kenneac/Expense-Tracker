import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth, useSignUp } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "@/assets/styles/auth.styles";
import { COLORS } from "@/constants/colors";

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const { error } = await signUp.password({
        emailAddress,
        password,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        setError("Something went wrong while creating your account.");
        return;
      }

      await signUp.verifications.sendEmailCode();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError("Something went wrong. Please try again.");
    }
  };

  const handleVerify = async () => {
    try {
      await signUp.verifications.verifyEmailCode({
        code,
      });

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }

            const url = decorateUrl("/");
            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              router.push(url as Href);
            }
          },
        });
      } else {
        console.error("Sign-up attempt not complete:", signUp);
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError("Verification failed. Please check the code and try again.");
    }
  };

  // Resets the current sign-up attempt's local state (email, password, code, etc.)
  // and sends the user back to the beginning of the sign-up form.
  const handleRestart = async () => {
    await signUp.reset();
    setEmailAddress("");
    setPassword("");
    setCode("");
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={50}
      >
        <View style={styles.verificationContainer}>
          <Image
            source={require("@/assets/images/revenue-i2.png")}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.verificationTitle}>Verify your email</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={() => setError("")}>
                <Ionicons name="close" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          ) : null}

          <TextInput
            style={[styles.verificationInput, error && styles.errorInput]}
            value={code}
            placeholder="Enter your verification code"
            placeholderTextColor={COLORS.textLight}
            onChangeText={(value) => setCode(value)}
            keyboardType="numeric"
          />

          {errors?.fields?.code ? (
            <Text style={styles.errorText}>{errors.fields.code.message}</Text>
          ) : null}

          <View style={styles.secondaryButtonRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => signUp.verifications.sendEmailCode()}
            >
              <Text style={styles.secondaryButtonText}>I need a new code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleVerify}
              style={[
                styles.button,
                fetchStatus === "fetching" && styles.buttonDisabled,
                { marginBottom: 0 },
              ]}
              disabled={fetchStatus === "fetching"}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleRestart}
            >
              <Text style={styles.secondaryButtonText}>Restart Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      bottomOffset={50}
    >
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/revenue-i2.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Create Account</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor={COLORS.textLight}
          onChangeText={(value) => setEmailAddress(value)}
          keyboardType="email-address"
        />

        {errors?.fields?.emailAddress ? (
          <Text style={styles.errorText}>
            {errors.fields.emailAddress.message}
          </Text>
        ) : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor={COLORS.textLight}
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
        />

        {errors?.fields?.password ? (
          <Text style={styles.errorText}>{errors.fields.password.message}</Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.button,
            (!emailAddress || !password || fetchStatus === "fetching") &&
              styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!emailAddress || !password || fetchStatus === "fetching"}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}