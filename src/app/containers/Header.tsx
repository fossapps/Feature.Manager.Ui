import * as React from "react";
import { ConnectedLink } from "react-router5";
import { stylesheet } from "typestyle";
import { getRoutes } from "../routes/routes";

const classNames = stylesheet({
  activeLink: {
    textDecoration: "underline"
  },
  nav: {
    $nest: {
      ul: {
        $nest: {
          li: {
            display: "inline",
            padding: "5px"
          }
        },
        listStyleType: "none",
        padding: 0
      }
    }
  }
});

export class Header extends React.Component {
  public render(): JSX.Element {
    const routes = getRoutes();
    return (
      <nav className={classNames.nav}>
        <ul>
          <li>
            <ConnectedLink activeClassName={classNames.activeLink} routeName={routes.homePage.name}>
              Home
            </ConnectedLink>
          </li>
        </ul>
      </nav>
    );
  }
}
