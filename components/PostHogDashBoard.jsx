export default function PostHogDashBoard() {
    return (
        <div style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh'
        }}>
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen 
                src="https://us.posthog.com/embedded/IZc3v1EtV02tTVScUX15HuenDadnAg"
            />
        </div>
    )
}