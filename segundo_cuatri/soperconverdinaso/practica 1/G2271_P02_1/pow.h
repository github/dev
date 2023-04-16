/**
 * @file pow.h
 * @author SOPER teaching team.
 * @brief Computation of the POW.
 * @version 1.5
 * @date 2023-02-02
 *
 * @copyright Copyright (c) 2022
 *
 */

#ifndef _POW_H
#define _POW_H

#define POW_LIMIT 99997669 /*!< Maximum number for the hash result. */

/**
 * @brief Computes the following hash function:
 * f(x) = (X x + Y) % P.
 *
 * @param x Argument of the hash function, x.
 * @return Result of the hash function, f(x).
 */
long int pow_hash(long int x);

#endif