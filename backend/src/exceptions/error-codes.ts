/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  DataSaveError = 400,
  DataUpdateError = 400,

  IncorrectLoginOrPassword = 401,
  UserAlreadyExists = 409,
  UserNotFound = 404,

  WishNotFound = 404,
  WishesNotFound = 404,
  WishUpdateForbidden = 400,
  WishUpdateSumForbidden = 403,
  WishDeleteForbidden = 403,

  WishlistDeleteForbidden = 403,
  WishlistNotFound = 404,

  OfferForbidden = 403,
  OfferRaisedForbidden = 403,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.DataSaveError, 'Ошибка. Не удалось сохранить данные'],
  [ErrorCode.DataUpdateError, 'Ошибка. Не удалось обновить данные'],

  [ErrorCode.IncorrectLoginOrPassword, 'Неправильный логин или пароль'],
  [ErrorCode.UserAlreadyExists, 'Пользователь с таким email или username уже зарегистрирован'],
  [ErrorCode.UserNotFound, 'Пользователь не найден'],

  [ErrorCode.WishNotFound, 'Подарок не найден'],
  [ErrorCode.WishesNotFound, 'Подарки не найдены'],
  [ErrorCode.WishUpdateForbidden, 'Изменять можно только свой подарок'],
  [ErrorCode.WishUpdateSumForbidden, 'Нельзя обновить стоимость после начала сбора средств'],
  [ErrorCode.WishDeleteForbidden, 'Можно удалять только свои подарки'],

  [ErrorCode.WishlistDeleteForbidden, 'Можно удалять только свои списки подарков'],
  [ErrorCode.WishlistNotFound, 'Список подарков не найден'],
  
  [ErrorCode.OfferForbidden, 'Нельзя вносить деньги на собственные подарки'],
  [ErrorCode.OfferRaisedForbidden, 'Сумма собранных средств не может превышать стоимость подарка'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.DataSaveError, HttpStatus.BAD_REQUEST],
  [ErrorCode.DataUpdateError, HttpStatus.BAD_REQUEST],
  
  [ErrorCode.IncorrectLoginOrPassword, HttpStatus.UNAUTHORIZED],
  [ErrorCode.UserAlreadyExists, HttpStatus.CONFLICT],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],

  [ErrorCode.WishNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishesNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishUpdateForbidden, HttpStatus.BAD_REQUEST],
  [ErrorCode.WishUpdateSumForbidden, HttpStatus.FORBIDDEN],
  [ErrorCode.WishDeleteForbidden, HttpStatus.FORBIDDEN],

  [ErrorCode.WishlistDeleteForbidden, HttpStatus.FORBIDDEN],
  [ErrorCode.WishlistNotFound, HttpStatus.NOT_FOUND],

  [ErrorCode.OfferForbidden, HttpStatus.FORBIDDEN],
  [ErrorCode.OfferRaisedForbidden, HttpStatus.FORBIDDEN],
]);
