export interface Experience {
  company: string
  role: string
  period: string
  description: string
  tech: string[]
  type: 'full-time' | 'contract' | 'internship'
}

export const experience: Experience[] = [
  {
    company: 'Curium | Medical Transcription',
    role: 'Frontend Web Developer Intern',
    period: 'Jan 2024 — Apr 2024',
    description:
      'Built a full-stack medical imaging tool using React.js, Django REST APIs, and PostgreSQL for hernia diagnosis. Designed responsive UIs and integrated image visualization and annotation features to enhance doctor feedback workflows. Collaborated with backend developers to ensure smooth API integration and optimized data flow across the application.',
    tech: ['React.js', 'Django', 'REST API', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS'],
    type: 'internship',
  },
]

export const education = [
  {
    institution: 'RVU',
    degree: 'Bachelor of Engineering in Computer Science and Engineering',
    period: 'Aug 2022 — Aug 2026',
    grade: 'CGPA: 6.60',
  },
  {
    institution: 'Sky Hawk International School, Delhi',
    degree: 'Grade XII',
    period: '2022',
    grade: '72%',
  },
  {
    institution: 'Scholars Rosary Senior Secondary School, Rohtak',
    degree: 'Grade X',
    period: '2020',
    grade: '88.5%',
  },
]
