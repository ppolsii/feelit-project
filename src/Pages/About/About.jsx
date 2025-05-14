// src/Pages/About.jsx

import React from "react";
import { Helmet } from "react-helmet";
import styles from "./About.module.css";
import AboutSection from "./AboutSection";

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <Helmet>
        <title>About - FeelIt Project</title>
      </Helmet>

      <div className={styles.aboutContent}>
        <h1 className={styles.aboutTitle}>About FeelIt</h1>

        <AboutSection title="Project Purpose">
          <p className={styles.aboutParagraph}>
            FeelIt is a web-based tool developed as part of an Engineering Bachelor's Thesis. Its main objective is to
            analyze public opinions shared online about various topics: travel destinations, brands,
            public figures, products, and much more.
          </p>
          <p className={styles.aboutParagraph}>
            Through an intuitive interface, users can perform keyword searches and receive a visual and analytical
            summary of the most relevant opinions collected from Reddit, one of today's largest and most dynamic platforms for public discussion.
          </p>
        </AboutSection>

        <AboutSection title="System Operation">
          <p className={styles.aboutParagraph}>
            When a user enters a search term (for example, "trip to Malta" or "artificial intelligence"), the system
            automatically queries Reddit, retrieves the most relevant comments, and processes them.
          </p>
          <p className={styles.aboutParagraph}>
            The system filters the collected comments to retain only those containing useful information. It then classifies
            each comment by sentiment (positive, negative, or neutral) and generates a clear visual summary,
            helping users quickly interpret the overall perception within the Reddit community.
          </p>
        </AboutSection>

        <AboutSection title="Technologies Used">
          <p className={styles.aboutParagraph}>
            The backend leverages <code className={styles.aboutCode}>FastAPI</code> to handle Reddit searches and data analysis.
            <br />
            Reddit data is collected using <code className={styles.aboutCode}>PRAW</code> (Python Reddit API Wrapper).
            <br />
            Comments are analyzed using a lightweight fine-tuned <code className={styles.aboutCode}>DistilBERT</code> model to filter out irrelevant content.
            <br />
            Sentiment analysis and summarization are enhanced through the use of the <code className={styles.aboutCode}>OpenAI GPT-3.5 Turbo API</code>.
            <br />
            The frontend is built using <code className={styles.aboutCode}>React</code> and styled with <code className={styles.aboutCode}>Tailwind CSS</code> and custom CSS modules.
          </p>
        </AboutSection>

        <AboutSection title="How to Download and Run the Project">
          <p className={styles.aboutParagraph}>
            FeelIt is divided into two separate repositories:
          </p>
          <ul className={styles.aboutList}>
            <li>
              <strong>Frontend (React app):</strong>{" "}
              <a
                href="https://github.com/ppolsii/feelit-project-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.aboutLink}
              >
                github.com/ppolsii/feelit-project-frontend
              </a>
            </li>
            <li>
              <strong>Backend (FastAPI service):</strong>{" "}
              <a
                href="https://github.com/ppolsii/feelit-project-backend"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.aboutLink}
              >
                github.com/ppolsii/feelit-project-backend
              </a>
            </li>
          </ul>

           <div className={styles.warningBox}>
            <strong>Important:</strong> Before using real data, set <code>useMockData</code> to <code>false</code> in <code>config.js</code> (currently set to <code>true</code> to display sample results).
           </div>

          <p className={styles.aboutParagraph}>
            To run the project locally, follow these steps:
          </p>

          <div className={styles.stepCardsContainer}>
            <div className={styles.stepCard}>
              <strong className={styles.stepTitle}>Clone the repositories:</strong>
              <p className={styles.stepText}>
                Clone both the frontend and backend repositories to your local machine:
              </p>
              <pre className={styles.codeBlock}>
                git clone https://github.com/ppolsii/feelit-project-frontend<br/>
                git clone https://github.com/ppolsii/feelit-project-backend
              </pre>
            </div>

            <div className={styles.stepCard}>
              <strong className={styles.stepTitle}>Install dependencies:</strong>
              <p className={styles.stepText}>
                For the frontend, navigate to the frontend folder and run:
              </p>
              <pre className={styles.codeBlock}>npm install</pre>
              <p className={styles.stepText}>
                For the backend, navigate to the backend folder and run:
              </p>
              <pre className={styles.codeBlock}>pip install -r requirements.txt</pre>
            </div>

            <div className={styles.stepCard}>
              <strong className={styles.stepTitle}>Set up Reddit API and OpenAI credentials:</strong>
              <p className={styles.stepText}>
                In the backend, create a <code>.env</code> file containing your Reddit API keys and your <a className={styles.aboutLink} href="https://platform.openai.com/settings/organization/api-keys">OpenAI API key </a>. <br/>
                Example:
              </p>
              <pre className={styles.codeBlock}>
                CLIENT_ID=your_reddit_client_id<br/>
                CLIENT_SECRET=your_reddit_client_secret<br/>
                USER_AGENT=your_app_name<br/> 
                <br/>
                OPENAI_API_KEY=your_openai_api_key<br/>
                OPENAI_MODEL=gpt-3.5-turbo (recommended)
              </pre>
            </div>

            <div className={styles.stepCard}>
              <strong className={styles.stepTitle}>Run the backend server:</strong>
              <p className={styles.stepText}>Start the FastAPI backend by running:</p>
              <pre className={styles.codeBlock}>uvicorn app.main:app --reload</pre>
              <p className={styles.stepText}>
                The backend will be available at <code>http://localhost:8000</code>.
              </p>
            </div>

            <div className={styles.stepCard}>
              <strong className={styles.stepTitle}>Run the frontend application:</strong>
              <p className={styles.stepText}>
                In the frontend project folder, start the React development server:
              </p>
              <pre className={styles.codeBlock}>npm run dev</pre>
              <p className={styles.stepText}>
                The frontend will be available at <code>http://localhost:5173</code>.
              </p>
            </div>

            <div className={styles.stepCard}>
              <strong className={styles.stepTitle}>Enjoy!</strong>
              <p className={styles.stepText}>
                You can now perform searches and view sentiment analysis results through the web interface.
              </p>
            </div>
          </div>
        </AboutSection>


      </div>
    </div>
  );
}
