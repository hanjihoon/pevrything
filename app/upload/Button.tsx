'use client';
import Button from '@mui/material/Button'
import App from 'next/app';

interface bbProps {
    userName: string
}

function buttonClick(name:string): void{
    console.log(`Hi there, ${name}`);
}

export default function BasicButton(props: bbProps) {
  return (
    <div>
      <Button onClick={() => buttonClick(props.userName)}>강아지 리스트</Button>
    </div>
  )
}
