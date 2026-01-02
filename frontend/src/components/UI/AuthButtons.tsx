
// components/ui/AuthButtons.tsx
import { Link } from "react-router-dom";
import Button from "./Button";

export function SignInButton(props: { loading?: boolean; fullWidth?: boolean; onClick?: () => void }) {
  return (
    <Button variant="primary" size="md" loading={props.loading} fullWidth={props.fullWidth} onClick={props.onClick}>
      Sign in
    </Button>
  );
}

// export function RegisterButton(props: { loading?: boolean; fullWidth?: boolean; to?: string }) {
//   const to = props.to ?? "/register";
//   return (
//     <Button as={Link} to={to} variant="outline" size="md" fullWidth={props.fullWidth}>
//       Create account
//     </Button>
//   );
// }

export function LogoutButton(props: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="sm" onClick={props.onClick}>
      Logout
    </Button>
  );
}


export function CreateAccountButton(props: { loading?: boolean; fullWidth?: boolean; to?: string }) {
  const to = props.to ?? '/register';
  return (
    <Button as={Link} to={to} variant="secondary" size="md" loading={props.loading} fullWidth={props.fullWidth} aria-disabled={props.loading} >
      Create Account
    </Button>
  );
}

