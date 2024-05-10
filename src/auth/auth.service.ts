import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorLogin } from './dto/author-login.dto';
import { AuthorRegister } from './dto/author-register.dto';
import { Author } from './entities/author.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}
  async authorRegister(authorRegister: AuthorRegister) {
    const isExistEmail = await this.authorRepository.findOneBy({
      email: authorRegister.email,
    });
    if (isExistEmail) throw new ConflictException('Email already taken');
    const author = this.authorRepository.create(authorRegister);
    const insertUser = await this.authorRepository.insert(author);
    return { message: 'Register successfully' };
  }
  async authorLogin(authorLogin: AuthorLogin) {
    const author = await this.authorRepository.findOne({
      where: { email: authorLogin.email },
      select: ['email', 'password', 'id'],
    });
    if (!author) throw new NotFoundException();
    console.log(author);
    const isMatchPassword = await bcrypt.compare(
      authorLogin.password,
      author.password,
    );
    if (!isMatchPassword)
      throw new UnauthorizedException('Invalid password or email');
    const jwtPayload = { id: author.id };
    const accessToken = this.jwtService.sign(jwtPayload);
    return { message: 'login successfully', accessToken };
  }

  async getAuthors() {
    return await this.authorRepository.find();
  }
}
