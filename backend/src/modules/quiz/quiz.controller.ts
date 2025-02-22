// import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
// import { QuizService } from './quiz.service';
// import { CreateQuizDto, UpdateQuizDto } from './dto/quiz.dto';
// import { successResponse, errorResponse } from '@/utils/helpers/response.helper';
// import { Filter, UuidDto } from '@/common/dto.common';
// import { Request } from 'express';
// import { ApiBearerAuth } from '@nestjs/swagger';
// import { JwtAuthGuard } from '../auth/guards/jwt.guard';

// @ApiBearerAuth('access-token')
// @UseGuards(JwtAuthGuard)
// @Controller()
// export class QuizController {
//   constructor(
//     private readonly quizService: QuizService,
//   ) { }

//   @Get('quizzes')
//   async findAll(@Query() params: Filter) {
//     try {
//       const data = await this.quizService.getQuizzes(params);

//       return successResponse({ data, isPaginate: true });
//     } catch (error) {
//       console.log(error);
//       return errorResponse(error.message, error.status);
//     }
//   }

//   @Get('quiz')
//   async findOne(@Query() param: UuidDto, @Query() filter: Filter, @Req() req: Request) {
//     try {
//       const data = await this.quizService.findOne(param, filter, req?.user);

//       return successResponse({ data, isPaginate: true });
//     } catch (error) {
//       console.log(error);
//       return errorResponse(error.message, error.status);
//     }
//   }

//   @Post('quiz')
//   async create(@Body() quizDto: CreateQuizDto) {
//     try {
//       const data = await this.quizService.create(quizDto);

//       return successResponse({ data })
//     } catch (error) {
//       console.log(error);
//       return errorResponse(error.message, error.status);
//     }
//   }

//   @Put('quiz')
//   async update(@Body() dto: UpdateQuizDto) {
//     try {
//       const data = await this.quizService.update(dto);

//       return successResponse({ data })
//     } catch (error) {
//       console.log(error);
//       return errorResponse(error.message, error.status);
//     }
//   }

//   @Post('quiz/attempt')
//   async attempt(@Query() dto: UuidDto, @Req() req: Request) {
//     try {
//       const data = await this.quizService.attempt(dto, req.user);

//       return successResponse({ data })
//     } catch (error) {
//       console.log(error);
//       return errorResponse(error.message, error.status);
//     }
//   }
// }
