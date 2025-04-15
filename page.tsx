import Link from "next/link";
import { Chatbot } from "@/components/chatbot";
import { Layout } from "@/components/layout/layout";

export default function Home() {
  return (
    <Layout>
      <Chatbot />
    </Layout>
  );
}
