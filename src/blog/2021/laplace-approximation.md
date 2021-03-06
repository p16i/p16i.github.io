---
path: "/blog/2021-laplace-approximation"
date: "2021-03-06"
title: "Laplace Approximation"
---

## Background : Taylor Expansion

Consider a function $f: \mathcal X  \rightarrow \reals$ and $\mathbf x \in \mathcal X.$  Let's say we would to approximate $f(x)$ around a local  maximum value of $f$. We start by finding the optimal value using calculus, i.e. $f'(x_0) = 0$; note also that at $x_0$  we have $f''(x_0) < 0$. We then do the Taylor expansion to the 2nd order around $x_0$:


$$
\begin{aligned}
f(x) &\approx f(x_0) + f'(x_0) (x - x_0)  + \frac{1}{2} f''(x_0) ( x- x_0)^2 \\
&= f(x_0) +  \frac{1}{2} f''(x_0) (x- x_0)^2.
\end{aligned}
$$


Let's try to approximate $f(x) = e^{\frac{\sin x}{x}}$ . For this function, $x_0 = 1$ and $f''(x_0) = -1/3$.  From derivation, we have 


$$
\begin{aligned}
f(x) &\approx f(x_0)  + \frac{1}{2} f''(x_0) (x- x_0)^2  \\
&= 1 - \frac{1}{6} ( x- x_0)^2
\end{aligned}
$$

<div align="center">
  <img src="https://i.imgur.com/rEcnKJW.png"/>
  <div style="color: gray">Fig 1: Approximating a function with Taylor expansion.</div>
  <br/>
</div>


## Laplace Approximation

In brief, Laplace (sometimes also called Gaussian) approximation applies the Taylor expansion on$f(w)$ to compute 


$$
p(w) = \frac{e^{f(w)}}{Z}
$$


such that $\int p(w) dw = 1$.  In other words, $Z= \int_{-\infty}^\infty e^{f(w)} dw$ and $e^{f(w)}$  is a likelihood. 

Let's assume that we only care about the behaviour of $p(w)$  around the mode $w_\text{MAP}$. Define $\gamma := - f''(x_0)$. For the previous section, we know that 


$$
\begin{aligned}
 e^{f(w)}  &\approx  e^{f(w_\text{MAP})} e^{-\frac{1}{2}\gamma (w - w_\text{MAP})^2  } 
\end{aligned}
$$

Thus, we get


$$
Z = e^{f(w_\text{MAP})} \sqrt{\frac{2\pi}\gamma}.
$$


In other word, $p(w) \approx \hat p(w)= \mathcal N(w_\text{MAP}, \sigma^2= (1/\gamma^2))$.

### Application 1: Approximating Posterior Distributions

Consider a dataset $\mathcal D = \{ ( \mathbf x_i, y_i)\}_{i=1}^n$   and $\mathbf x_i, \mathbf w \in \reals^d$. We want to estimate estimate the posterior 


$$
p(\mathbf w | \mathcal D) = \frac{ p(\mathcal D |  \mathbf w) p(\mathbf w)}{p(\mathcal D)} .
$$


Using the identity $e^{\log a} =a$, we can write


$$
p(\mathbf w | \mathcal D) = \frac{1}{Z} e^{- f(\mathbf w)},
$$


where $f(\mathbf w)  =- (\log p(\mathcal D | \mathbf w) + \log  p(\mathbf w) )$ and $Z = p(\mathcal D)$. For the sake of completeness, we repeat the same derivation again but for the $d$  dimensional case. We perform  the Taylor explanation on $f (\mathbf w)$ at the mode $\mathbf w_\text{MAP}$ , yielding


$$
\begin{aligned}
f(\mathbf w) \approx f (\mathbf w_\text{MAP}) + \cancel{\nabla f(\mathbf w_\text{MAP})^T ( \mathbf w - \mathbf w_\text{MAP})} + \frac{1}{2} (\mathbf w - \mathbf w_\text{MAP})^T \mathbf  H_{\mathbf w_\text{MAP}} (\mathbf w - \mathbf w_\text{MAP}),
\end{aligned}
$$


where the first order is zero by construction and $\mathbf  H_{\mathbf w_\text{MAP}} := \nabla^2  f(\mathbf w_\text{MAP})$. Therefore, the posterior is 


$$
\hat p(\mathbf w | \mathcal D) \approx \frac{1}{Z} e^{f(\mathbf w_\text{MAP})} e^{ -\frac{1}{2} (\mathbf w - \mathbf w_\text{MAP})^T \mathbf  H_{\mathbf w_\text{MAP}}(\mathbf w - \mathbf w_\text{MAP}) },
$$


which is in the form of a Gaussian distribution. If we set


$$
Z = p(\mathcal D) = e^{-f(\mathbf w_\text{MAP})} (2\pi)^{d/2}| \mathbf  H_{\mathbf w_\text{MAP}} |^{-1/2},
$$


we get


$$
\hat p(\mathbf w | \mathcal D) = \mathcal N( \mathbf w_\text{MAP}, \mathbf  H_{\mathbf w_\text{MAP}}^{-1}).
$$

<div align="center">
  <img src="https://i.imgur.com/CXbDwJV.png"/>
  <div style="color: gray">Fig. 2: Two posterior approximations using Laplace approximation.</div>
<br/>
</div>

#### Proton Counter Problem (Mackay (2013), Ex. 27.1)

Define $r \in \mathbb N$ the number of protons measured and we want to infer their arrival rate $\lambda \in \reals_+$. We assume that $r$ follows a Poisson distribution, hence


$$
p(r|\lambda) = e^{-\lambda} \frac{\lambda^r}{r!}.
$$


We further assume that we have an improper prior, $p(\lambda) = 1/\lambda.$ Define 


$$
\begin{aligned}
f(\lambda) &: = -\log p(r|\lambda)p(\lambda) \\
&= \lambda - \log \lambda^r + \log r! - \log \lambda^{-1}. \\
&= \lambda - \log \lambda^{r-1} + \log r!.
\end{aligned}
$$


Taking derivate $f'(\lambda) \overset{!}{=} 0$ yields


$$
\lambda_\text{MAP} = r-1.
$$


We also have $f''(\lambda) = \frac{r-1}{\lambda^2}$, thus


$$
f''(\lambda_\text{MAP}) = \frac{1}{r-1} = \frac{1}{\lambda_\text{MAP}}.
$$


Therefore, the approximated posterior is 


$$
\hat p(\lambda | r) = \mathcal N(\mu, \sigma^2),
$$


where $\mu := \lambda_\text{MAP} = r-1$ and $\sigma^2 := 1/f''(\lambda_\text{MAP}) = \lambda_\text{MAP}^2$.

### Application 2: Stirling’s formula

Consider the Euler Gamma function


$$
\Gamma(t) = \int_{0}^{\infty} x^{t-1} e^{-x} dx,
$$


$\forall t > 0$. We can see that $\Gamma(t+1) = t\Gamma(t)$  and $\Gamma(1) = 1$; in other words, this function is the factorial function


$$
t!= \Gamma(t+1).
$$


Although we know the formula for the factorial, our goal is to approximate the function with a closed form without explicitly computing the factorial. We start by defining a new variable 


$$
\begin{aligned}
y := -\ln x,
\end{aligned}
$$


thus $x = e^y$ , $dx = e^y dy$, and $y \in \reals$. Using integration by substitution yields


$$
\begin{aligned}
\int_0^\infty x^{t-1} e^{-x} dx &= \int_{-\infty}^{\infty} e^{(t-1)y} e^{-e^y} e^y dy \\
&= \int_{-\infty}^{\infty} e^{g(y)}dy,
\end{aligned}
$$


where $g(y) =  (t-1)y + y - e^y = ty - e^y$. Computing the first and second derivatives, we get

- $g'(y) = t  - e^y$; setting it to zero yields the maximum value  $y_0 := \ln t$.
- $g''(y) = e^y$ ; therefore, the second derivative at $y_0$  is $g''(y_0) = t$.

Therefore, using the Laplace approximation, we arrive at 


$$
\begin{aligned}
\int_{-\infty}^{\infty} e^{g(y)} dy & \approx e^{g(y_0)} \sqrt {\frac{2\pi}{t} } \\
&= e^{(t \ln t - t)} \sqrt {\frac{2\pi}{t} }\\
&= \sqrt{2\pi} e^{-t} t^{t-\frac{1}{2}}.
\end{aligned}
$$


With this approximation, we can compute 


$$
\begin{aligned}
t! &= t \Gamma(t) \\
&\approx t\bigg(\sqrt{2\pi} e^{-t} t^{t-\frac{1}{2}}\bigg) \\
&= \sqrt{2\pi t} \bigg( \frac{t}{e}\bigg)^t.
\end{aligned}
$$

<div align="center">
  <img src="https://i.imgur.com/4uGWefP.png"/>
  <div style="color: gray">Fig. 3: Relative error of t! approximation</div>
  <br/>
</div>

## Conclusion

One obvious limitation of the Laplace approximation is inherit from the Taylor expansion that it captures only the local behaviour of the function near the root point: in the case of approximating the posterior distribution, this root point is the mode of the distribution. 

I consulted the following materials while writing this article:

- [Murphy (2012), "Machine Learning: A Probabilistic Perspective", Section 8.4](https://probml.github.io/pml-book/book0.html)
- [Manfred Opper's Probabilistic Bayesian Modeling course, Lecture Laplace Approximation (TU Berlin, Summer 2020)](https://www.ki.tu-berlin.de/menue/lehre/sommersemester_2020/).
- [Gundersen (2019), "Laplace's Method"](https://gregorygundersen.com/blog/2019/05/08/laplaces-method/)

Figures in this article are made using [Google Colab](https://colab.research.google.com/drive/1l7S_e9qbJ1REi8h7I_N9NfFiGQoRYgyO?usp=sharing).
