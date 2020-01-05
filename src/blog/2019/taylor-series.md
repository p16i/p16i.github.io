---
path: /blog/2019-maclaurin-and-taylor-series
date: 2019-12-25
title: Maclaurin and Taylor Series
---

Consider an unknown function $f(x)$. How can one approximate $f(x)$ if (s)he know the information of the function $f(x)$, such as derivaties, at a certain $x$, e.g. $x=0$?

## Maclaurin Series
One way is to use a polynomial with infinitely many terms $p_0(x) = a_0 +  a_1 x + a_2 x^2 + \dots$ using $f(x)$'s information around $x=0$. The idea is that each term in the polynomial approximates a certain aspect of $f(x)$:
- The first term govern $p_0(x)$ such that $p(0) = f(0)$;
- The second term govern $p_0(x)$ such that  $p'(0) =  f'(0)$;
- The $n$-th term should govern $p_0(x)$ such that $p^{(n)}(0) =  f^{(n)}(0)$.

Consider the $n$-th term in $p(x)$. From the construction, this term allows $p^{(n)}(0) = f^{(n)}(0)$, hence
$$
\begin{aligned}
p^{(i)}(0) &= \underbrace{n(n-1)(n-2)\cdots(1)}_{\text{derivative coefficients}} (a_n)  \\
&= f^{(n)}(0).
\end{aligned}
$$

The equation above suggests that $a_n = \frac{f^{(n)}(0)}{n!}$. In principle, we can use infinitely many terms, i.e. $n \rightarrow \infty$, yielding a series:

$$
p_0(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}x^n,
$$

which is called **Maclaurin** series. 

### Example
Considier $x^{​3}-x^{​2}-​x+1$. Let $p_0^n(x)$ be the polynomial approximation upto degree $j$:

$$
p_0^{(j)}(x) = \sum_{n=0}^{j} \frac{f^{(n)}(0)}{n!} x^n + \underbrace{O(x^{j+1})}_{\text{error}}.
$$

The equation above tells us that we will make some error $O(x^{j+1})$ when we use only the first j+1 term approximation; thus, this technique gives accurate approximation only in a region near $x=0$.

<div align="center">
  <img src="https://i.imgur.com/OIcNUf0.png"/><br/>
</div>

## Taylor Series

In general, one might have information at a particular point $x \ne 0$, i.e $x=c$ for $c \in \mathbb{R}$. Using the same derivation as $x=0$, the polynomial approximation at $x=c$ is

$$
p_c(x) =
 \sum_{n=0}^\infty \frac{f^{(n)}(c)}{n!}(x-c)^n.
$$

This is the Taylor series, a generalized version of the Maclaurin series into any arbitary $x$. In essence, this means we do local expansion around $x=c$: the farther we are away from $c$ the larger approximation error we get.


<div align="center">
  <img src="https://i.imgur.com/Xax9VGA.png"/>
</div>

## Conclusion
In this article, I have discussed the origin and the idea behind the Maclaurin and Taylor series. The Taylor series itself is a foundation in optimization and machine learning. 

If you are would like to explore these two series on different functions, you might be interested in looking at my [Colab notebook](https://colab.research.google.com/drive/1OPphSeC4AVZm0NBSHjifCqgOYNXKuYUP#scrollTo=mrlDotIAOdJ0), which I used it to make the two figures for this article.