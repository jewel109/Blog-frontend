import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import Page from '@/app/users/page'
import RootLayout from '@/app/layout'
import { Model } from 'miragejs'
import { createServer } from 'miragejs'
import { document } from 'postcss'
render(<Page />)
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

describe("post method in miragejs", () => {
  it("post method ", async () => {
  })
})
