type Props = {
    completed: number;
    total: number;
    lastActive?: string;
    label?: string;
};

export default function ProgressInline({ completed, total, lastActive, label = "Course completion" }: Props) {
    const pct = total ? Math.round((completed / total) * 100) : 0;

    return (
        <div style={{ margin: "12px 0", padding: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <b>{label}</b>
                <span style={{ opacity: 0.8 }}>{completed}/{total} ({pct}%)</span>
            </div>
            <div style={{ height: 8, background: "#e5e7eb", borderRadius: 999 }}>
                <div
                    style={{
                        width: `${pct}%`,
                        height: 8,
                        background: "#4f46e5",
                        borderRadius: 999,
                        transition: "width .2s ease"
                    }}
                />
            </div>
            {lastActive && (
                <div style={{ marginTop: 8, opacity: 0.7, fontSize: 13 }}>
                    Last activity: {new Date(lastActive).toLocaleString()}
                </div>
            )}
        </div>
    );
}
