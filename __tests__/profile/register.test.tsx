import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import Page from '@/app/(home)/register/page'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import RootLayout from '@/app/layout'
import { document } from 'postcss'
import { store } from '@/lib/store/store';
// describe("miragejs test", function() {
//   it("server started", async () => {
//
//
//     let users
//     try {
//       const response = await fetch('api/users');
//       users = await response.json();
//       console.log(users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//     expect(users).toStrictEqual(
//       [
//         { id: "1", name: "Luke" },
//         { id: "2", name: "Leia" },
//         { id: "3", name: "Anakin" },
//       ])
//
//     // console.log(users)
//   })


// })
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

const mockStore = configureStore([]);
describe("post method in miragejs", () => {

  it("post method ", async () => {

    render(<Provider store={store}><Page /></Provider>)
    const myElm = screen.getByText("hei")
    expect(myElm).toBeInTheDocument()
  })
})
