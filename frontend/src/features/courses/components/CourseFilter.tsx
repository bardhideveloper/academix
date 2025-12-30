import { useState, useEffect } from 'react';
import type { Course } from '../types';

type Props = {
    courses: Course[];
    onChange: (list: Course[]) => void;
};

export default function CourseFilter({ courses, onChange }: Props) {
    const [q, setQ] = useState('');
    const [level, setLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

    useEffect(() => {
        const query = q.trim().toLowerCase();
        const filtered = courses.filter(c => {
            const matchesText =
                c.title.toLowerCase().includes(query) ||
                (c.description ?? '').toLowerCase().includes(query);
            const matchesLevel = level === 'all' ? true : c.level === level;
            return matchesText && matchesLevel;
        });
        onChange(filtered);
    }, [q, level, courses, onChange]);

    return (
        <div style={{ display: 'flex', gap: 12, margin: '12px 0 20px' }}>
            <input
                placeholder="Search courses…"
                value={q}
                onChange={e => setQ(e.target.value)}
                style={{ padding: 8, flex: 1 }}
            />
            <select
                value={level}
                onChange={e => setLevel(e.target.value as 'all' | 'beginner' | 'intermediate' | 'advanced')}
                style={{ padding: 8 }}
            >
                <option value="all">All levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
        </div>
    );
}
