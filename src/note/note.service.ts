import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>
  ){}
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    return await this.notesRepository.save(createNoteDto) 
  }

  async findAll(): Promise<Note[]> {
    return await this.notesRepository.find() 
  }

  async findOne(id: number): Promise<Note> {
    return await this.notesRepository.findOne(id)
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
     let editedNote = await this.notesRepository.findOne(id);
     if(!editedNote){
       throw new NotFoundException('note not found')
     }
     editedNote.text = updateNoteDto.text
     editedNote.desc = updateNoteDto.desc
     return await editedNote.save()
  }

  remove(id: number) {
    return this.notesRepository.delete(id)
  }
}
