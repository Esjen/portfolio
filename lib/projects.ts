/**
 * Project data shared by the Projects section on the home page and the
 * dedicated case-study page at /projects/[slug].
 *
 * A project gets a case-study page by having a `details` object.
 */

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface ProjectDetails {
  tagline: string;
  /** Short facts shown as chips under the title. */
  meta: string[];
  overview: string[];
  problem: string[];
  results: { value: string; label: string }[];
  features: { title: string; text: string }[];
  howItWorks: { title: string; text: string }[];
  screenshots: Screenshot[];
  stack: { layer: string; items: string }[];
  learned: { title: string; text: string }[];
  /** Honest notes on what the project does not do yet. */
  limitations: string[];
  /** Why there is no live link, shown instead of a demo button. */
  noDemoNote?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the card image: UI screenshots read best from the top. */
  imagePosition: "top" | "center";
  featured: boolean;
  tech: string[];
  github: string;
  demo: string;
  details?: ProjectDetails;
}

export const CONTACT_EMAIL = "john.esonu@pau.edu.ng";
export const LINKEDIN_URL = "https://linkedin.com/in/johnesonu-213970291";

export const projects: Project[] = [
  {
    slug: "clearsight",
    title: "ClearSight",
    summary:
      "An explainable malware-detection dashboard. It classifies Windows executables with Random Forest, XGBoost or LightGBM and shows which features of the file drove each verdict, using SHAP.",
    image: "/projects/clearsight-result.png",
    imageAlt:
      "ClearSight dashboard showing a malicious verdict with 100% confidence and a ranked bar chart of the features that drove it",
    imagePosition: "top",
    featured: true,
    tech: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "SHAP",
      "Node.js",
      "Express",
      "React",
      "PostgreSQL",
    ],
    github: "https://github.com/Esjen/clear-sight",
    demo: "",
    details: {
      tagline: "Explainable static malware detection for security operations",
      meta: ["Final-year project", "Pan-Atlantic University", "2026"],
      overview: [
        "ClearSight is a web dashboard for a security analyst. It classifies a Windows executable as malicious or benign and, on the same screen, shows which features of the file pushed the model towards that verdict. It was my final-year project at Pan-Atlantic University.",
        "You choose a file from the EMBER 2018 test set (row 0 to 199,999) and one of three trained models: Random Forest, XGBoost or LightGBM. ClearSight returns the verdict with a confidence score, says whether it matches the dataset's reference label, and ranks the ten features that influenced the prediction as horizontal bars. Red bars push towards malicious, green towards benign, and the SHAP value is printed beside each one. A second tab compares what all three models relied on for the same file. Every prediction is saved to a database.",
      ],
      problem: [
        "Machine-learning malware detectors can score thousands of files, but a score on its own does not tell an analyst why a file was flagged. That makes a false positive hard to investigate and a decision hard to justify to anyone else.",
        "Explanation methods such as SHAP can say which features mattered, but in most research code they stay a separate chart made after evaluation. I wanted to see how they could sit inside the detection workflow, so the explanation arrives with the verdict.",
        "The project does not claim that EMBER, SHAP or tree-based classifiers are new. The contribution is putting them together in a usable workflow, and comparing what different models rely on when they reach the same answer.",
      ],
      results: [
        { value: "96.7%", label: "LightGBM accuracy on 200,000 unseen test files" },
        { value: "0.994", label: "LightGBM AUC-ROC, the best of the three models" },
        {
          value: "16 of 20",
          label: "top SHAP features shared by XGBoost and LightGBM",
        },
        { value: "2,381", label: "numeric features extracted per file" },
      ],
      features: [
        {
          title: "Verdict with confidence",
          text: "Each file is labelled malicious or benign, with the model's confidence as a percentage.",
        },
        {
          title: "Reference-label check",
          text: "The result states whether the prediction matches the label stored in EMBER, so the analyst does not have to look it up.",
        },
        {
          title: "Ranked explanation",
          text: "The ten most influential features are drawn as bars. Colour shows direction (red towards malicious, green towards benign) and length shows strength.",
        },
        {
          title: "Three interchangeable models",
          text: "Switch between Random Forest, XGBoost and LightGBM and see how the same file is explained by each.",
        },
        {
          title: "Do the models agree?",
          text: "A comparison tab measures how much the top 20 features of each pair of models overlap, over 1,000 test files, with a 95% interval from 2,000 bootstrap resamples.",
        },
        {
          title: "Compare one file",
          text: "Shows the three models' explanations side by side and highlights features that at least one other model also ranks in its top 20.",
        },
        {
          title: "Prediction history",
          text: "Every prediction is saved to PostgreSQL with its top features stored as JSONB, and can be read back through a /history endpoint.",
        },
        {
          title: "Failure isolation",
          text: "The database write happens after the response is sent, so a database problem cannot break a prediction.",
        },
      ],
      howItWorks: [
        {
          title: "The page sends a request",
          text: "The React dashboard posts the row number and model name to the Express API.",
        },
        {
          title: "The API starts the Python script",
          text: "The backend writes the request to a temporary JSON file and runs infer.py as a subprocess. The models stay in Python, where they were trained.",
        },
        {
          title: "The model predicts and explains",
          text: "infer.py loads the pickled model, predicts, computes SHAP values for that single file and prints the result as JSON.",
        },
        {
          title: "The result comes back and is stored",
          text: "The API returns the JSON to the page and saves it to PostgreSQL in the background.",
        },
      ],
      screenshots: [
        {
          src: "/projects/clearsight-result.png",
          alt: "ClearSight single-model view: a malicious verdict from LightGBM with 100% confidence and the ten most influential features as red bars",
          caption:
            "Single model view. LightGBM labels a test file malicious with 100% confidence, matches the reference label, and shows the features behind the decision.",
          width: 1180,
          height: 860,
        },
        {
          src: "/projects/clearsight-agreement.png",
          alt: "ClearSight comparison tab showing the overlap of top-20 features between each pair of models with confidence intervals",
          caption:
            "Compare models tab. XGBoost and LightGBM share most of their top features; Random Forest relies on a much different set.",
          width: 1180,
          height: 400,
        },
        {
          src: "/projects/clearsight-compare.png",
          alt: "ClearSight comparing Random Forest, XGBoost and LightGBM explanations for one benign file side by side",
          caption:
            "Compare one file. All three models call this file benign, but the evidence each one ranks highest is different.",
          width: 1180,
          height: 1340,
        },
      ],
      stack: [
        {
          layer: "Machine learning",
          items: "Python 3.14, scikit-learn (Random Forest, depth 20), XGBoost, LightGBM",
        },
        { layer: "Explainability", items: "SHAP TreeExplainer" },
        {
          layer: "Data",
          items: "EMBER 2018 with its feature extractor: 600,000 training and 200,000 test files, 2,381 values per file",
        },
        {
          layer: "Backend",
          items: "Node.js, Express 4, TypeScript, pg, dotenv, cors",
        },
        { layer: "Database", items: "PostgreSQL, with top features stored as JSONB" },
        { layer: "Frontend", items: "React 18, TypeScript, Vite 5, plain CSS (no UI library)" },
      ],
      learned: [
        {
          title: "Accuracy is not the whole story",
          text: "The three models finished within about 2.4 percentage points of each other, yet they relied on different evidence. XGBoost and LightGBM agreed closely on their top features, while Random Forest leaned heavily on byte-entropy features. A model's training method shapes the explanation an analyst sees, not only its score.",
        },
        {
          title: "Library versions can fail quietly",
          text: "A newer scikit-learn broke the string hashing inside the EMBER feature extractor. I adapted the function, and learned to sanity-check numbers instead of assuming a library is correct.",
        },
        {
          title: "Explanations have a cost",
          text: "Exact SHAP values on a fully grown Random Forest were impractical. Capping tree depth at 20 cut training from 86 to 45 minutes and cost under one percentage point of accuracy, which made explanations feasible.",
        },
        {
          title: "Keep each tool in its own language",
          text: "I did not rewrite the models in TypeScript. Running the Python script as a subprocess let the machine-learning code stay where it was trained and tested, while Node handled routing, validation and storage.",
        },
        {
          title: "Configuration errors can look like credential errors",
          text: "A database password error turned out to be a missing .env file. Checking which value the code actually reads comes before blaming the credential.",
        },
      ],
      limitations: [
        "It is a proof of concept that runs locally and has no login.",
        "It works from pre-extracted EMBER feature vectors, so it cannot yet take an uploaded executable.",
        "SHAP explains what the model used, not whether a file is truly malicious. The output is decision support, not proof.",
        "It shows that an explained detection workflow is feasible. It does not show that analysts work faster with it, which would need a user study.",
        "Next steps: extract features from an uploaded file, run a study with analysts, and repeat the model comparison across several training runs.",
      ],
      noDemoNote:
        "ClearSight needs a multi-gigabyte dataset, trained Python models and a PostgreSQL database, so it runs locally. The screenshots below come from the running app.",
    },
  },
  {
    slug: "autoflow-ai",
    title: "AutoFlow AI",
    summary:
      "A visual workflow builder for sales automation. Drag nodes onto a canvas, connect a trigger to an AI step and an action, run it, and read the step-by-step log. Includes version history, share links, a webhook trigger and a leads pipeline.",
    image: "/projects/autoflow-builder.png",
    imageAlt:
      "AutoFlow AI dashboard with the visual workflow builder, node library and node settings panel",
    imagePosition: "top",
    featured: true,
    tech: ["Next.js", "TypeScript", "React Flow", "Supabase", "Tailwind CSS"],
    github: "https://github.com/Esjen/autoflow-ai-updated-3-",
    demo: "",
  },
  {
    slug: "malscan",
    title: "MalScan",
    summary:
      "A static analysis tool for Windows executables. It reads PE headers, imports, sections and strings, measures entropy, builds a simplified control-flow view, and gives a 0 to 100 risk score with a plain-language explanation. Built as an independent side project during my internship.",
    image: "/projects/malscan-overview.png",
    imageAlt:
      "MalScan overview showing a risk score of 23 out of 100 and the PE metadata of an analysed executable",
    imagePosition: "top",
    featured: false,
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase Edge Functions"],
    github: "https://github.com/Esjen/malscan",
    demo: "",
  },
  {
    slug: "ai-expense-tracker",
    title: "AI Expense Tracker",
    summary:
      "An intelligent expense tracking system built with n8n that uses Telegram, AI-powered text extraction, and Google Sheets to automatically categorize expenses and generate organized financial records.",
    image: "/projects/expense-tracker.png",
    imageAlt: "AI Expense Tracker n8n workflow",
    imagePosition: "center",
    featured: false,
    tech: ["n8n", "Telegram Bot", "Google Sheets", "AI", "Automation"],
    github: "",
    demo: "",
  },
  {
    slug: "ai-document-classifier",
    title: "AI Document Classifier",
    summary:
      "An AI-powered workflow that automatically classifies uploaded documents, routes them to the appropriate destination, and reduces manual document processing using intelligent automation.",
    image: "/projects/document-classifier.png",
    imageAlt: "AI Document Classifier n8n workflow",
    imagePosition: "center",
    featured: false,
    tech: ["n8n", "AI", "Automation", "Document Processing"],
    github: "",
    demo: "",
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    summary:
      "A modern developer portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion featuring responsive design, dark mode, smooth animations, and project showcases.",
    image: "/projects/portfolio.png",
    imageAlt: "Personal portfolio website",
    imagePosition: "center",
    featured: false,
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Dark Mode"],
    github: "https://github.com/Esjen/portfolio",
    demo: "https://portfolio-seven-red-60o1w6yc1i.vercel.app",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
