import { useState, useEffect } from "react";
import { supabase, formatDateToDDMMYYYY } from "../lib/supabase";
export default function Display() {
  const [ _ , setData] = useState<any[]>([]);
  const [item, setItem] = useState<any>({
    id: 1,
    date: new Date(),
    potd: { notes: "", dailyDone: false },
    striver_sheet: { problemsSolved: 0, dailyDone: false, notes: "" },
    personal: { notes: "", dailyDone: false },
    internship: { notes: "", dailydone: false },
    skill_rack: { notes: "", dailyDone: false, problemsSolved: 0 },
  });
  useEffect(() => {
    const fetchStriverData = async () => {
      const formattedDate = formatDateToDDMMYYYY(new Date());
      const { data, error } = await supabase
        .from("Personal Tracking")
        .select()
        .eq("id", formattedDate);
      if (error) {
        console.error("error", error);
        return;
      }
      if (data === undefined || data.length === 0) {
        const { error } = await supabase
          .from("Personal Tracking")
          .insert([
            {
              id: formattedDate,
              date: new Date(),
              potd: { notes: "", dailyDone: false },
              striver_sheet: { problemsSolved: 0, dailyDone: false, notes: "" },
              personal: { notes: "", dailyDone: false },
              internship: { notes: "", dailydone: false },
              skill_rack: { notes: "", dailyDone: false, problemsSolved: 0 },
            },
          ]);
        if (error) {
          console.error("error", error);
          return;
        }
        setData([
          {
            id: formattedDate,
            date: new Date(),
            potd: { notes: "", dailyDone: false },
            striver_sheet: { problemsSolved: 0, dailyDone: false, notes: "" },
            personal: { notes: "", dailyDone: false },
            internship: { notes: "", dailydone: false },
            skill_rack: { notes: "", dailyDone: false, problemsSolved: 0 },
          },
        ]);
        setItem({
          id: formattedDate,
          date: new Date(),
          potd: { notes: "", dailyDone: false },
          striver_sheet: { problemsSolved: 0, dailyDone: false, notes: "" },
          personal: { notes: "", dailyDone: false },
          internship: { notes: "", dailydone: false },
          skill_rack: { notes: "", dailyDone: false, problemsSolved: 0 },
        });
        return;
      }
      setData(data);
      setItem(data[0]);
    };
    fetchStriverData();
  }, []);
  return (
    <div>
      <div key={item.id}>
        <h1>Daily Updates</h1>
        <h2> POTD</h2>
        <p>
          {" "}
          Problem of the Day done: {item.potd.dailyDone === true ? "✅" : "❌"}
        </p>
        <p> Notes: {item.potd.notes}</p>
        <h2> Striver Sheet</h2>
        <p>
          {" "}
          Daily Done: {item.striver_sheet.dailyDone === true ? "✅" : "❌"}
        </p>
        <p> Problems Solved: {item.striver_sheet.problemsSolved}</p>
        <p> Notes: {item.striver_sheet.notes}</p>
        <h2> Skill Rack</h2>
        <p> Daily Done: {item.skill_rack.dailyDone === true ? "✅" : "❌"}</p>
        <p> Problems Solved: {item.skill_rack.problemsSolved}</p>
        <p> Notes: {item.skill_rack.notes}</p>
        <h2>Podcast</h2>
        <p>
          {" "}
          Listened to podcast or read book:{" "}
          {item.personal.dailyDone === true ? "✅" : "❌"}
        </p>
        <p> Notes: {item.personal.notes}</p>
        <h2> Internship Work</h2>
        <p> Daily Done: {item.internship.dailydone === true ? "✅" : "❌"}</p>
        <p> Notes: {item.internship.notes}</p>
      </div>
    </div>
  );
}
