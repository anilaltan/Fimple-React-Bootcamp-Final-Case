import { useState } from "react";
import { UserContext } from "../context/userContext";

// const withLoading = (WrappedComponent) => {
//   return class WithLoading extends React.Component {
//     static contextType = UserContext; // Use UserContext directly

//     state = {
//       loading: false,
//     };

//     handleLogin = async (username, password) => {
//       try {
//         this.setState({ loading: true });
//         await this.context.loginUser(username, password);
//       } catch (error) {
//         // Handle login error
//         console.error("Login failed:", error);
//       } finally {
//         this.setState({ loading: false });
//       }
//     };

//     handleLogout = async () => {
//       try {
//         this.setState({ loading: true });
//         await this.context.logoutUser();
//       } catch (error) {
//         // Handle logout error
//         console.error("Logout failed:", error);
//       } finally {
//         this.setState({ loading: false });
//       }
//     };

//     render() {
//       const { loading } = this.state;

//       return (
//         <WrappedComponent
//           {...this.props}
//           loading={loading}
//           onLogin={this.handleLogin}
//           onLogout={this.handleLogout}
//         />
//       );
//     }
//   };
// };

// export default withLoading;

export function withLoading(Component) {
  return function AdminComponent(props) {
    const [loading, setLoading] = useState(false);

    // const handleLogin = async (username, password) => {
    //   try {
    //     this.setState({ loading: true });
    //     await this.context.loginUser(username, password);
    //   } catch (error) {
    //     // Handle login error
    //     console.error("Login failed:", error);
    //   } finally {
    //     this.setState({ loading: false });
    //   }
    // };

    // const handleLogout = async () => {
    //   try {
    //     this.setState({ loading: true });
    //     await this.context.logoutUser();
    //   } catch (error) {
    //     // Handle logout error
    //     console.error("Logout failed:", error);
    //   } finally {
    //     this.setState({ loading: false });
    //   }
    // };
    return (
      <>
        {loading && <div>Loading...</div>}
        {!loading && (
          <UserContext.Consumer>
            {(contexts) => (
              <Component {...props} {...contexts} setLoading={setLoading} />
            )}
          </UserContext.Consumer>
        )}
      </>
    );
  };
}
