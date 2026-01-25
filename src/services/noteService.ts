import axios from "axios";
import type { Note } from "../types/note";
import type { NoteFormValues } from "../components/NoteForm/NoteForm";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export async function fetchNotes(
  page: number = 1,
  search: string = ''
): Promise<FetchNotesResponse> {
  const { data } = await noteApi.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page,
      perPage: 12,
    },
  });
  return data;
}
export async function createNote(newNote: NoteFormValues): Promise<Note> {
  const { data } = await noteApi.post<Note>('/notes', newNote);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await noteApi.delete<Note>(`/notes/${id}`);
  return data;
}

