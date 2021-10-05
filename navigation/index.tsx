import * as React from "react";
import { AuthenticatedUserProvider } from "./AuthenticatedUserProvider";
import RootNavigator from "./RootNavigator";

export default function Navigation() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
