import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AdminWelcomeEmailProps {
  name?: string | null;
  resetUrl: string;
}

const purple = "#5a55df";
const darkText = "#242331";
const mutedText = "#686677";

export const AdminWelcomeEmail: React.FC<AdminWelcomeEmailProps> = ({
  name,
  resetUrl,
}) => {
  const greetingName = name?.trim() || "there";

  return (
    <Html>
      <Head />
      <Preview>
        Welcome to Code Space. Set your password to access your account.
      </Preview>
      <Body
        style={{
          backgroundColor: "#f4f4f8",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          margin: 0,
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            maxWidth: "600px",
            padding: "48px",
          }}
        >
          <Section
            style={{
              backgroundColor: purple,
              borderRadius: "2px",
              padding: "42px 24px",
              textAlign: "center" as const,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              CODE SPACE
            </Text>
          </Section>

          <Section style={{ paddingTop: "36px" }}>
            <Heading
              style={{
                color: darkText,
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: "1.35",
                margin: "0 0 18px",
              }}
            >
              Hey {greetingName},
            </Heading>

            <Text
              style={{
                color: darkText,
                fontSize: "15px",
                lineHeight: "1.7",
                margin: "0 0 16px",
              }}
            >
              Welcome to Code Space. An admin has created an account for you so
              you can access the admin area and help manage the community
              website.
            </Text>

            <Text
              style={{
                color: darkText,
                fontSize: "15px",
                lineHeight: "1.7",
                margin: "0 0 24px",
              }}
            >
              Use the button below to set your own password. This link is
              generated securely and should only be used by you.
            </Text>

            <Section style={{ textAlign: "center" as const }}>
              <Button
                href={resetUrl}
                style={{
                  backgroundColor: purple,
                  borderRadius: "4px",
                  color: "#ffffff",
                  display: "inline-block",
                  fontSize: "15px",
                  fontWeight: 700,
                  padding: "14px 26px",
                  textDecoration: "none",
                }}
              >
                Set your password
              </Button>
            </Section>

            <Text
              style={{
                color: mutedText,
                fontSize: "13px",
                lineHeight: "1.6",
                margin: "26px 0 0",
                textAlign: "center" as const,
              }}
            >
              If the button does not work, open this link:
              <br />
              <Link
                href={resetUrl}
                style={{
                  color: purple,
                  wordBreak: "break-all" as const,
                }}
              >
                {resetUrl}
              </Link>
            </Text>
          </Section>

          <Hr
            style={{
              borderColor: "#e7e5f0",
              borderStyle: "solid",
              borderWidth: "1px 0 0",
              margin: "36px 0 20px",
            }}
          />

          <Text
            style={{
              color: mutedText,
              fontSize: "13px",
              lineHeight: "1.6",
              margin: 0,
              textAlign: "center" as const,
            }}
          >
            Need help, or have questions?
            <br />
            Please visit our{" "}
            <Link
              href="https://www.codespaces.org/contact-us"
              style={{ color: purple }}
            >
              contact us page
            </Link>
            , or reply to this message.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export function getAdminWelcomeEmailText({
  name,
  resetUrl,
}: AdminWelcomeEmailProps) {
  const greetingName = name?.trim() || "there";

  return [
    `Hey ${greetingName},`,
    "",
    "Welcome to Code Space. An admin has created an account for you so you can access the admin area and help manage the community website.",
    "",
    "Set your password using this link:",
    resetUrl,
    "",
    "Need help? Reply to this message or visit https://www.codespaces.org/contact-us.",
  ].join("\n");
}
