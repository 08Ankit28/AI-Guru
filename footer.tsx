export function Footer() {
  return (
    <footer className="border-t py-4 bg-background/95 backdrop-blur">
      <div className="container flex flex-col items-center justify-center gap-2 text-center md:flex-row md:gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AI Guru. Created by Ankit, Priyanshu & Abhishek
        </p>
      </div>
    </footer>
  );
}
