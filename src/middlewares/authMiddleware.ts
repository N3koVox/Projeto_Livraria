import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'b8a3f4c6d8e7f4b2c3a8e1d7f4a2d8c3e1f7a3d8e1c2b4a6f8d3b2a8e9f1d3';

interface TokenPayload {
  id: number;
  email: string;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token esta faltando' });
  }

  const token = authHeader.split(' ')[1]; // Espera o formato "Bearer TOKEN"

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = decoded; // Adiciona os dados do usuário ao objeto da requisição
    next(); // Continua para a rota protegida
  } catch (error) {
    res.status(403).json({ message: 'Token invalido ou expirado' });
  }
};
