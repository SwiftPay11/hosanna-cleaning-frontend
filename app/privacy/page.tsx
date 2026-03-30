export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-[#8B5E3C] mb-6">
          PRIVACY POLICY
        </h1>

        <p className="text-gray-400 mb-10 whitespace-pre-line">
          Hosanna Global Enterprises Limited
          {"\n"}Last Updated: 29/03/2026
        </p>

        {/* Intro */}
        <p className="text-gray-300 leading-relaxed mb-8">
          This Privacy Policy (“Policy”) sets out the basis upon which Hosanna Global Enterprises Limited (“Hosanna Global”, “the Company”, “we”, “us”, or “our”) collects, processes, stores, and protects personal data obtained from users (“you” or “your”) who access our website www.hosannaglobal.co.uk or otherwise engage with our products and services.
        </p>

        <p className="text-gray-300 leading-relaxed mb-8">
          This Policy is issued in accordance with the UK General Data Protection Regulation (“UKGDPR”), the Data Protection Act 2018, and any other applicable data protection legislation.
        </p>

        <p className="text-gray-300 leading-relaxed mb-10">
          By accessing our website or providing your personal data, you acknowledge that you have read, understood, and agree to the terms of this Policy.
        </p>

        {/* Sections */}
        <Section title="1. Definitions">
          <p>For the purposes of this Policy:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>“Personal Data” means any information relating to an identifiable natural person.</li>
            <li>“Processing” means any operation performed on Personal Data, whether automated or not.</li>
            <li>“Data Controller” refers to Hosanna Global Enterprises Limited, which determines the purposes and means of processing Personal Data.</li>
            <li>“Third Party” refers to any external entity to whom data may be lawfully disclosed.</li>
          </ul>
        </Section>

        <Section title="2. Scope">
          <p>This Policy applies to all Personal Data collected through:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Our website.</li>
            <li>Contact forms and inquiries.</li>
            <li>Account creation or service registration.</li>
            <li>Email or telephone communications.</li>
            <li>Any other interactions between you and the Company.</li>
          </ul>
        </Section>

        <Section title="3. Information We Collect">
          <h3 className="mt-4 font-semibold text-[#8B5E3C]">
            3.1 Personal Data Provided Directly by You
          </h3>
          <p className="mt-2">
            We may collect the following categories of information:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Full name.</li>
            <li>Address and contact details (email, telephone number, postal address);</li>
            <li>Payment details and billing information.</li>
            <li>Information submitted via forms, inquiries, or service requests.</li>
            <li>Any additional information voluntarily provided to us.</li>
          </ul>

          <h3 className="mt-6 font-semibold text-[#8B5E3C]">
            3.2 Information Collected Automatically
          </h3>
          <p className="mt-2">
            When you access our website, we may automatically collect:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>IP address.</li>
            <li>Browser type and version.</li>
            <li>Device identifiers.</li>
            <li>Log files, cookies, and usage data.</li>
            <li>Pages viewed and time spent on the website.</li>
            <li>Referring website and clickstream data.</li>
          </ul>

          <h3 className="mt-6 font-semibold text-[#8B5E3C]">
            3.3 Cookies and Similar Technologies
          </h3>
          <p className="mt-2">
            We use cookies and tracking technologies to enhance website functionality and analyse usage patterns. You may refuse cookies via browser settings; however, certain features may become unavailable.
          </p>
        </Section>

        <Section title="4. Legal Basis for Processing">
          <p>We process Personal Data only as permitted by law. Lawful bases include:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Consent – where you have explicitly agreed to the processing.</li>
            <li>Contractual Necessity – to perform obligations arising from contracts entered with you.</li>
            <li>Legal Obligation – to comply with statutory requirements.</li>
            <li>Legitimate Interests – to operate, manage, and improve our business and services, provided such interests do not override your rights.</li>
          </ul>
        </Section>

        <Section title="5. Purposes for Processing Personal Data">
          <p>We may process your Personal Data for the following purposes:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>To provide, manage, and improve our services.</li>
            <li>To respond to inquiries or requests for information.</li>
            <li>To process payments or transactions.</li>
            <li>To send servicerelated communications or updates.</li>
            <li>To comply with legal and regulatory obligations.</li>
            <li>To maintain the security and integrity of our systems.</li>
            <li>For internal administrative and business efficiency purposes.</li>
          </ul>
        </Section>

        <Section title="6. Disclosure of Personal Data">
          <p>We do not sell Personal Data.</p>
          <p className="mt-2">We may disclose your information to:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Service Providers engaged to perform functions on our behalf (e.g., IT support, hosting providers, payment processors).</li>
            <li>Professional Advisors (e.g., auditors, insurers, legal counsel).</li>
            <li>Regulatory or Government Authorities where required by law.</li>
            <li>Business Partners in connection with the delivery of services.</li>
          </ul>
          <p className="mt-3">
            All Third Parties are obligated to maintain confidentiality and implement appropriate data protection measures.
          </p>
        </Section>

        <Section title="7. CrossBorder Data Transfers">
          <p>
            Where Personal Data is transferred outside the United Kingdom, we shall ensure that adequate safeguards are in place, including but not limited to:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Standard Contractual Clauses (SCCs).</li>
            <li>Transfers to jurisdictions deemed adequate by the UK authorities.</li>
          </ul>
        </Section>

        <Section title="8. Data Retention">
          <p>We retain Personal Data only for as long as is necessary to:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Fulfil the purpose(s) for which it was collected.</li>
            <li>Satisfy legal, accounting, or reporting obligations.</li>
            <li>Resolve disputes and enforce agreements.</li>
          </ul>
          <p className="mt-3">
            Retention periods shall be determined in accordance with our internal Data Retention Policy.
          </p>
        </Section>

        <Section title="9. Data Security">
          <p>We implement appropriate technical and organisational measures to safeguard Personal Data against:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Unauthorised access.</li>
            <li>Accidental loss or destruction.</li>
            <li>Misuse or alteration.</li>
          </ul>
          <p className="mt-3">
            While we strive to protect your data, no method of electronic transmission is entirely secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="10. Your Rights">
          <p>Under applicable data protection laws, you may have the following rights:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Right of Access – to obtain a copy of your Personal Data.</li>
            <li>Right to Rectification – to correct inaccurate or incomplete data.</li>
            <li>Right to Erasure – to request deletion of your data where lawful.</li>
            <li>Right to Restrict Processing.</li>
            <li>Right to Data Portability.</li>
            <li>Right to Object to certain processing.</li>
            <li>Right to Withdraw Consent at any time.</li>
          </ul>
          <p className="mt-3">
            All requests should be submitted in writing to the contact details below.
          </p>
        </Section>

        <Section title="11. ThirdParty Websites">
          <p>
            Our website may contain links to external sites not operated or controlled by us.
            We accept no responsibility for the content or privacy practices of such sites and recommend reviewing their respective privacy policies.
          </p>
        </Section>

        <Section title="12. Children’s Data">
          <p>
            Our website and services are not intended for persons under 16 years of age.
            We do not knowingly collect Personal Data from minors.
            If you believe that a child has provided Personal Data, please contact us promptly.
          </p>
        </Section>

        <Section title="13. Changes to This Policy">
          <p>
            We reserve the right to amend or update this Policy at any time.
            Revisions will become effective upon publication on our website, with the “Last Updated” date reflecting the amendment.
          </p>
        </Section>

        <Section title="14. Contact Information">
          <p>
            For questions, concerns, or to exercise your data protection rights, please contact:
          </p>
          <p className="mt-3">
            Hosanna Global Enterprises Limited <br />
            Email: Info@hosannaglobal.co.uk <br />
            Phone: +447774559680 <br />
            Registered Address: 41 Edward Street, Middlesbrough
          </p>
        </Section>

      </div>
    </main>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-10 border-b border-[#8B5E3C]/20 pb-6">
      <h2 className="text-lg font-semibold text-[#8B5E3C] mb-4">
        {title}
      </h2>
      <div className="text-gray-300 text-sm leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}