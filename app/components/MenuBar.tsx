'use client';

import { Button, Navbar } from 'flowbite-react';

export default function NavbarWithCTAButton() {
  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="http://localhost:3000/dog-list">
        
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-12 sm:h-24"
          src="/img/logos/pevrything_banner.png"
        />
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>
          로그인
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active href="http://localhost:3000/dog-list">
          <p className="font-bold text-xl">홈</p>
        </Navbar.Link>
        <Navbar.Link href="#">
          <p className="font-bold text-xl">성향에 맞는 반려견 찾기</p>
        </Navbar.Link>
        <Navbar.Link href="http://localhost:3000/dog-list">
          <p className="font-bold text-xl">반려견 목록</p>
        </Navbar.Link>
        <Navbar.Link href="#">
          <p className="font-bold text-xl">게시판</p>
        </Navbar.Link>
        <Navbar.Link href="#">
          <p className="font-bold text-xl">문의</p>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}