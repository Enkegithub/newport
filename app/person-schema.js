export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nitesh Kushwaha",
    url: "https://www.niteshkushwaha.com.np",
    image: "https://www.niteshkushwaha.com.np/icon.jpg",
    jobTitle: "Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer, Flutter Developer, Android Developer and AI Engineer.",
    sameAs: [
      "https://github.com/Enkegithub",
      "https://www.linkedin.com/in/nitesh-kushwaha/",
      "https://www.instagram.com/nites_kushwaha/",
      "https://scholar.google.com/citations?user=fuyU3vEAAAAJ&hl=en",
      "https://www.researchgate.net/profile/Nitesh-Kushwaha-4"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
