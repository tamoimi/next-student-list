import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

export default function List() {
  const [students, setStudents] = useState([]);
  const getStudents = async () => {
    const students = await (
      await fetch(`/api/students`, { method: "GET" })
    ).json();
    setStudents(students);
  };

  useEffect(() => {
    getStudents();
  }, []);

  //useEffect(()=>{},[]): 함수, 언제실행할지, 마지막곳의 값이 변할때 마다 useEffect가 변함
  //useEffect는 함수가 실행될때 자동적으로 실행되는것
  //students의 값이 바뀔때마다 useEffect가 활성화

  const delStudents = async () => {
    const response = await (
      await fetch(`api/students`, {
        method: "DELETE",
      })
    ).json();
    console.log(response);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <h2>학생 리스트</h2>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>학년</TableCell>
              <TableCell>국어 점수</TableCell>
              <TableCell>영어 점수</TableCell>
              <TableCell>수학 점수</TableCell>
              <TableCell>총점</TableCell>
              <TableCell>총평균값</TableCell>
            </TableRow>{" "}
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.id}
                </TableCell>
                <TableCell>{student.studentName}</TableCell>
                <TableCell>{student.studentGrade}학년</TableCell>
                <TableCell>{student.kor}점</TableCell>
                <TableCell>{student.eng}점</TableCell>
                <TableCell>{student.math}점</TableCell>
                <TableCell>총점</TableCell>
                <TableCell>평균값</TableCell>
                <button style={{ width: 50, margin: 15 }} onClick={delStudents}>삭제</button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link href={`/`}>
          <a>
            <button type="button">학생기록부 입력하기</button>
          </a>
        </Link>
      </TableContainer>
      <style>
        {`
    .css-11xur9t-MuiPaper-root-MuiTableContainer-root {
      width: 900px;
      margin: 0 auto;
    }
    .css-1q1u3t4-MuiTableRow-root {
      background: #CDF0EA;
    }
    .css-11xur9t-MuiPaper-root-MuiTableContainer-root {
      text-align: center;
    }
    button {
        width: 200px;
        height: 40px;
        margin: 50px 0;
        border: none;
        border-radius: 4px;
        background: #CDF0EA;
        cursor: pointer;
        transition: all 0.5s;
    }
    button:hover {
        background: #FFC4C4;
    }
    `}
      </style>
    </>
  );
}
