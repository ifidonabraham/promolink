/** PromoLink leadership, taken from the company profile. */

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  /** Short line used on cards. */
  note: string;
  /** Full bio, drawn from the company profile (pages 5 and 6). */
  bio: string;
  /** `null` renders an initials avatar placeholder. */
  image: string | null;
};

export const team: TeamMember[] = [
  {
    slug: "chris-adeniyi",
    name: "Chris' A. Adeniyi",
    role: "Executive Chairman",
    note: "B.Sc FNIM, FCTI, CFA, FCA — leads the company's strategy and client relationships.",
    bio: "Chris is a graduate of Accounting from Olabisi Onabanjo University, Ago Iwoye, Ogun State. He is a Fellow of the Institute of Chartered Accountants of Nigeria and of the Chartered Institute of Taxation of Nigeria, and a full Member of the Nigeria Institute of Management, London. He has worked with companies including the Leventis Group, Afro Continental Nigeria, Royal Investments Limited and Sakura Ventures Limited. A seasoned professional accountant, he has participated in audit assignments, taxation, consultancy and secretarial services, lectured part-time at the Department of Accountancy & Finance, Yaba College of Technology, and presented papers at seminars and workshops. He is a member of the Examinations Committee of the Chartered Institute of Taxation of Nigeria, where he serves as Vice Chairman, and has been in accountancy and audit practice for over 25 years.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGGDtGNjMXcaQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708102971158?e=1792022400&v=beta&t=agKk4NbMdZgscJjY03r2oV5A_9x5TwJpPYm0K_RU0-Y",
  },
  {
    slug: "odelusi-banke",
    name: "Odelusi Banke",
    role: "Business Development Executive",
    note: "First point of contact for new briefs, quotations and account onboarding.",
    bio: "Odelusi Banke is a graduate of Business Administration from The Polytechnic Ibadan, Oyo State, and holds a Post Graduate Diploma from Lagos State University. She has worked with companies including Mutual Assets Limited and Dana & Associates, where she gained experience as a marketing executive. A seasoned marketer who has been involved in the sale of many goods and services, she has been with PromoLink Print Concepts for around five years.",
    // Headshot extracted from page 5 of the company profile.
    image: "/team/odelusi-banke.jpg",
  },
  {
    slug: "adeyemi-abiona",
    name: "Adeyemi Abiona",
    role: "Head of Operations",
    note: "Runs production across design, large-format, offset and finishing.",
    bio: "Adeyemi Abiona is a graduate of Fine and Applied Art from Ladoke Akintola University of Technology, Oyo State. He brings professional knowledge of business and advertising design, and is also experienced in graphic design, product design, interior design and illustration.",
    // Headshot extracted from page 5 of the company profile.
    image: "/team/adeyemi-abiona.jpg",
  },
  {
    slug: "ebenezer-adekusibe",
    name: "Ebenezer Adekusibe",
    role: "Finance & Client Accounts",
    note: "Accounting background; previously Special Assistant to the Ondo State Commissioner of Finance.",
    bio: "Ebenezer Adekusibe studied Accounting and Finance at Yaba College of Technology, Lagos State, and obtained a B.Sc in Economics from Lagos State University in 2006. He is an Associate Member of the Institute of Chartered Accountants of Nigeria and of the Chartered Institute of Taxation of Nigeria. He has worked with Indicator Media Group as General Manager, Finance and Administration, and with Adwise Integrated Resources Limited, Global West Nigeria Limited, W.B.F Investment, Wireless Trade Nigeria Limited, Goldpoint Consults and others in various capacities. A seasoned professional accountant who has participated in audit assignments, taxation, consultancy and secretarial services, he is currently a Special Assistant to the Ondo State Commissioner of Finance.",
    // Headshot extracted from page 6 of the company profile.
    // TODO(verify): confirm this portrait is Ebenezer's and not Chris'.
    image: "/team/ebenezer-adekusibe.jpg",
  },
];
