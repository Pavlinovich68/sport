import ParallaxScroll from "@/components/ParallaxScroll";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "./index.module.scss";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.page}>
      <ParallaxScroll />
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}
