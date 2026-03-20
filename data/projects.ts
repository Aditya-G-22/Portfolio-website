export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string
  live?: string
  image?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'AI-Based Spam Email Detection Web Extension',
    description:
      'Built a machine learning-based system to classify emails as Spam or Ham, improving automated email filtering. Applied text preprocessing techniques (tokenization, TF-IDF, stop-word removal) and trained multiple models including Naive Bayes, Random Forest, and XGBoost. Integrated the trained model into a Flask web application for real-time predictions.',
    tech: ['Python', 'Flask', 'Scikit-learn', 'Machine Learning', 'TF-IDF', 'HTML', 'CSS'],
    featured: true,
  },
  {
    title: 'Real-Time Sign Language Detector',
    description:
      'Built a real-time sign language recognition system using OpenCV and TensorFlow, capable of detecting English alphabet gestures via webcam. Applied image preprocessing, data augmentation, and CNN-based classification. Improved robustness across different lighting conditions and hand orientations.',
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Pandas'],
    featured: true,
  },
  {
    title: 'QR Code Scanner & Malicious Content Detector',
    description:
      'Developed a QR code scanning system that extracts embedded data and analyzes it for potential security risks. Detects URLs, UPI links, and WiFi payloads from QR data and applies heuristic checks (HTTPS, suspicious patterns). Strengthened understanding of secure input handling, URL analysis, and backend model inference.',
    tech: ['Python', 'OpenCV', 'Flask', 'Regex', 'Machine Learning'],
    featured: true,
  },
  {
    title: 'Medical Imaging Tool (Internship — Curium)',
    description:
      'Built a full-stack medical imaging tool for hernia diagnosis as a Frontend Web Developer Intern. Designed responsive UIs and integrated image visualization and annotation features to enhance doctor feedback workflows. Collaborated with backend developers on smooth API integration.',
    tech: ['React.js', 'Django', 'REST API', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS'],
  },
]
