export interface Skill {
  name: string
  level: number // 0-100
}

export interface SkillCategory {
  category: string
  icon: string
  items: Skill[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    icon: '◈',
    items: [
      { name: 'Python', level: 88 },
      { name: 'JavaScript', level: 82 },
      { name: 'C / C++', level: 72 },
      { name: 'Java', level: 65 },
      { name: 'HTML / CSS', level: 85 },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    icon: '◉',
    items: [
      { name: 'React.js', level: 82 },
      { name: 'Next.js', level: 75 },
      { name: 'Flask', level: 78 },
      { name: 'FastAPI', level: 68 },
      { name: 'Django', level: 65 },
    ],
  },
  {
    category: 'Machine Learning / Data',
    icon: '◎',
    items: [
      { name: 'TensorFlow / Keras', level: 75 },
      { name: 'Scikit-learn', level: 80 },
      { name: 'OpenCV', level: 72 },
      { name: 'Pandas / NumPy', level: 82 },
      { name: 'XGBoost', level: 65 },
    ],
  },
  {
    category: 'Developer Tools',
    icon: '◐',
    items: [
      { name: 'Git', level: 80 },
      { name: 'Docker', level: 60 },
      { name: 'MySQL / PostgreSQL', level: 72 },
      { name: 'Supabase', level: 68 },
      { name: 'Postman', level: 75 },
    ],
  },
]
