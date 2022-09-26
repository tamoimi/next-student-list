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

  //useEffect(()=>{},[]): 함수, 언제실행할지, 마지막곳의 값이 변할때 마다 useEffect가 실행
  //useEffect는 함수가 실행될때 자동적으로 실행되는것
  //students의 값이 바뀔때마다 useEffect가 활성화

  const delStudents = async (studentId) => {
    const response = await (
      await fetch(`api/students`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: studentId,
        }),
      })
    ).json();
    console.log(response);

    // 화면 갱신 코드
    setStudents((prev) => prev.filter((student) => student.id !== response.id));
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
              <TableCell>수정하기</TableCell>
              <TableCell>삭제하기</TableCell>
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
                <TableCell>{student.total}점</TableCell>
                <TableCell>{student.average}점</TableCell>
                <TableCell>
                  <Link href={`/students/${student.id}`}>
                    <a>
                      <button style={{ width: 35, margin: 15 }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    </a>
                  </Link>
                </TableCell>
                <TableCell>
                  <button
                    style={{ width: 35, margin: 15 }}
                    onClick={() => {
                      delStudents(student.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link href={`/students/[id]`}>
          <a>
            <button type="button">학생기록부 입력하기</button>
          </a>
        </Link>
      </TableContainer>
      <style>
        {`
    .css-11xur9t-MuiPaper-root-MuiTableContainer-root {
      width: 1200px;
      margin: 0 auto;
    }
    .css-1q1u3t4-MuiTableRow-root {
      background: #CDF0EA;
    }
    .css-1ygcj2i-MuiTableCell-root {
      text-align: center;
    }
    .css-11xur9t-MuiPaper-root-MuiTableContainer-root {
      text-align: center;
    }
    .css-1ex1afd-MuiTableCell-root {
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
