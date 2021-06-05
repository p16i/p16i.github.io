---
path: "/blog/2020-maximum-entropy"
date: "2020-12-27"
title: "Principle of Maximum Entropy"
---

Finding the underlying distribution that matches the data we observe is one of the most important aspect of machine learning. Without any constraint, this task seems to be impossible to solve; therefore, we need to also choose a set of assumptions, called inductive bias, that describe what characteristics of the solution (or hypothesis) that we prefer. One of such biases is Occam's Razor, which states that given two correct hypotheses the simpler one is preferred.

<iframe width="100%" height="492" frameborder="0"
  src="https://observablehq.com/embed/@heytitle/uncertainty-and-entropy?cells=questionView%2Cviewof+p%2Cchart"></iframe>

It might sound circulate, but one might ask "How can we determine which hypothesis is simple?".  As we are interested in finding a distribution that aligns well with our observational data, we might look at the entropy of the distribution, which measures the uncertainty (or surprise) of the distribution. Given a set of statistics we can extract from the data, one might choose the distribution that has the highest entropy. This is [Jaynes (1957)'s Principle of Maximum Entropy](https://journals.aps.org/pr/abstract/10.1103/PhysRev.106.620) (MaxEnt). My interpretation to this principle is that more surprise indicates that we make fewer assumptions or less claims about the data. 

# Deriving Distributions with MaxEnt

Before diving into the derivations, let's recall the definition of Entropy. Consider $X$ a random variable coming from $P_X$ whose domain $\mathcal{X}$ can be discrete or continuous. We  denote $p_X$  to be the probably mass function or probability density function. The definition of Shannon's entropy is:

$$
H(P_X) : = - \sum_{x \in \mathcal X} 
p_X(x) \log p_X(x).
$$

Given the statistics of the data such as its expectation $\mu$ and variance $\sigma^2$, our goal is to use MaxEnt to find $p_X$ subject to the following constraints:

- $\sum_{x \in \mathcal{X}} p_X(x) = 1$
- $\forall x \in \mathcal{X}$, $p_X(x) \ge 0$ (this condition would satisfy implicitly.)
- $E_{p_X}[X] = \mu$
- $\text{Var}(X) = E_{p_X}[X^2] - E_{p_X}[X]^2 = \sigma^2$.

## Discrete Uniform Distribution

Consider the support of the distribution $\mathcal{X} = \{a, a+1, \dots, b-1, b \}$ where $a, b \in \mathbb{Z}$ and $b > a$. In this case, we have only one constraint, namely $\sum_{x \in \mathcal X} p_X(x) = 1$. Denote $p_{x} := p_X(x), \forall x \in \mathcal X$. Using Lagrange multipliers, we have 

$$
\mathcal{L}(\{p_{x}\}, \lambda) = \bigg(- \sum_x p_{x} \log p_{x}\bigg) - \lambda \bigg(\sum_x p_{x} - 1\bigg).
$$

Taking partial derivative with respect to $p_x$, we get 

$$
\begin{aligned}
\frac{\partial \mathcal{L}(\{p_{x}\}, \lambda)}{\partial p_x} &= - 1 - \log p_x - \lambda \\
&\overset{!}{=} 0.
\end{aligned}
$$

This implies that $p_x = \exp(-1 - \lambda) \ge 0.$  Furthermore, the second partial derivative respect to $p_x$ is $- \frac{1}{p_x}$; therefore, this is the maximum. Similarly, we can do the same for $\lambda$:

$$
\begin{aligned}
\frac{\partial \mathcal{L}(\{p_{x}\}, \lambda)}{\partial \lambda } &= - \bigg(\sum_x p_{x} - 1\bigg)\\
&\overset{!}{=} 0.
\end{aligned}
$$

Noting that $|\mathcal X| = b - a + 1$. Therefore, we get 

$$
\begin{aligned}
\sum_x p_x &= 1 \\
\sum_x \exp(-1-\lambda) &= 1 \\
\exp(-1-\lambda) \sum_x  1 &= 1 \\
\exp(-1-\lambda) (b-a + 1) &= 1 \\ \\
\exp(-1-\lambda) &= \frac{1}{b-a + 1} \\ 
\lambda  &= - \log\bigg( \frac{1}{b-a + 1}\bigg)  - 1 .

\end{aligned}
$$

Hence, $\forall x \in \mathcal X$ we have 

$$
\begin{aligned}
p_x &= \exp(-1-\lambda) \\
&= \exp\bigg(\cancel{-1} +\log\bigg(\frac{1}{b- a + 1} \bigg) + \cancel{1} \bigg) \\
&= \frac{1}{b-a + 1},
\end{aligned}
$$

which is the **probability mass function of the discrete uniform distribution.** 

## Continuous Uniform Distribution

The derivation of this part is quite similar to the one above, expect that $\mathcal{X} = [a, b]$.  We also need to rely on the continuous version of entropy:


$$
H(P_X) = - \int_a^b p(x) \log p(x) \text{d}{x},
$$


called **differential entropy**. Noting here unlike the discrete version, differential entropy can be negative.

With this, we can set up Lagrangian as follows:


$$
\mathcal{L}(p(x), \lambda) = - \int_a^b p(x) \log p(x) \text{d}x -\lambda \bigg( \int_a^b p(x) \text{d}x - 1\bigg).
$$


Taking the functional derivative we get


$$
\begin{aligned}
\frac{\delta }{\delta p(x) } \mathcal{L}(p(x), \lambda_1) &= \frac{\delta }{\delta p(x) }  \bigg( - \int p(x) \log p(x) \text{dx} - \lambda  \int_a^b p(x) \text{d}x\bigg) \\
&= - \frac{p(x)}{p(x)} -  \log p(x)  - \lambda \\
&= - 1 - \log p(x) - \lambda \\
&\overset{!}{=} 0.
\end{aligned}
$$


This yields  $p(x) = \exp(-1 - \lambda) \ge 0$.  We can also see that $\frac{\delta^2 \mathcal L }{\delta p(x)^2} = - \frac{1}{p(x)} \le 0$.  Therefore, we have


$$
\begin{aligned}
1 & = \int p(x) \text{d}x \\&= \int \exp(-1 - \lambda) \text{d}x \\
&= \exp(-1 - \lambda) (b - a).
\end{aligned}
$$


We get  $p(x) = \frac{1}{b-a}$ , which is the **density of the continuous uniform distribution**.

## Univariate Gaussian Distribution

Now, let's consider that $\mathcal{X} = (-\infty, \infty)$ and we want to find $p(x)$ such that $\mathbb{E}_p[X] = \mu$  and $\text{Var}(X) = \sigma^2$. These two constraints can be rewritten as $\int p(x) (x - \mu)^2 \text{dx} = \sigma^2$. Therefore, we have the following Lagrangian: 


$$
\begin{aligned}
\mathcal{L}(p(x), \lambda_1, \lambda_2) &= - \int_\mathcal{X} p(x) \log p(x) \text{d}x \\& \ \ \ \ \  -\lambda_1 \bigg( \int_\mathcal{X} p(x) \text{d}x - 1\bigg) \\ &\ \ \ \ \ 
- \lambda_2\bigg(\int_\mathcal{X} (x - \mu)^2 p(x) \text{d}x - \sigma^2 \bigg).
\end{aligned}
$$


Taking the functional derivative, we get


$$
\begin{aligned}
\frac{\delta}{\delta p(x)} \mathcal{L} (p(\cdot), \lambda_1, \lambda_2) &= - 1 - \ln p(x) - \lambda_1 - \lambda_2 (x-\mu)^2 \\
&\overset{!}{=} 0.
\end{aligned}
$$


Solving the equation leads to $p(x) = \exp(\lambda_1 + \lambda_2(x-\mu)^2 - 1) \ge 0$ and the second derivative is also negative.  Based on the normalization constraint, we know that 


$$
\begin{aligned}
1 &= \int p(x) \text{dx} \\
&= \int \exp(\lambda_1 - \lambda_2(x-\mu)^2 - 1) \text{dx} \\
&= \exp(\lambda_1 - 1) \int \exp(\lambda_2(\underbrace{x-\mu}_{\triangleq z})^2) \text{dx} \\
&= \exp(\lambda_1 - 1) \int \exp(\lambda_2z^2) \text{dz} \\
&= \exp(\lambda_1 - 1) \sqrt{\frac{\pi}{-\lambda_2}}, 
\end{aligned}
$$


where the last step is the use of $\int z^{2n}\text{exp}(-\alpha z^2) \text{dz} = \sqrt{\frac{{\pi}}{\alpha}} \frac{(2n-1)!}{(2\alpha)^n}$ (See Appendix XX for the derivation of the identity). Rearranging the equation, we arrive at 


$$
\exp(\lambda_1 - 1) = \sqrt\frac{-\lambda_2}{\pi}.
$$


Now, we consider the second constraint:


$$
\begin{aligned}
\sigma^2 &= \int (x-\mu)^2 p(x) \text{dx} \\
&= \int (x-u)^2 \exp(\lambda_1 + \lambda_2 (x-u)^2 - 1) \text{dx} \\
&= \int z^2 \exp(\lambda_1 + \lambda_2 z^2 - 1) \text{dz} \\
&= \exp(\lambda_1 - 1) \int z^2 \exp(\lambda_2 z^2) \text{dz} \\
&= \cancel{\exp(\lambda_1 - 1)} \bigg( \frac{1}{-2\lambda_2}\cancel{\sqrt \frac{\pi}{-\lambda_2}}  \ \bigg).
\end{aligned}
$$


Therefore, we get $\lambda_2 = - \frac{1}{2\sigma^2}$. Plugging this back to  the identiy of  $\exp(\lambda_1 - 1)$  yields


$$
\begin{aligned}
\exp(\lambda_1 - 1) &= \sqrt{\frac{1}{2 \pi \sigma^2 }} \\
\lambda_1 - 1 &= \ln \sqrt{\frac{1}{2 \pi \sigma^2 }} \\
\lambda_1  &= 1 + \ln \sqrt{\frac{1}{2 \pi \sigma^2 }}.
\end{aligned}
$$


We have just solved the values of $\lambda_1$ and $\lambda_2$. We are ready to bring everything to the equation of $p(x)$:


$$
\begin{aligned}
p(x) &= \exp(\lambda_1 + \lambda_2 (x - \mu)^2 -1) \\
&= \exp \bigg( \cancel{1} + \ln \sqrt\frac{1}{2\pi\sigma^2} - \frac{(x - \mu)^2}{2\sigma^2} -\cancel{1} \bigg) \\
&= \frac{1}{2\pi\sigma^2} \exp\bigg(- \frac{(x-\mu)^2}{\sigma^2} \bigg),
\end{aligned}
$$


which is **the density of a univariate Gaussian distribution** whose parameters are $\mu$ and $\sigma^2$.

# Uniqueness of Distribution Given Constrainsts

Now, consider an arbitrary support  $\mathcal{X}$  and constraints 
$\mathbb{E}_{p_X}[\phi_i(X)] = \alpha_i, \forall i \in \{1, \dots,  d \}.$ We have the following Lagrangian


$$
\begin{aligned}
\mathcal{L}(p, \lambda, (\gamma_i)_i) &= - \int_\mathcal{X}p(x) \log p(x) \text{d}x - \lambda \int_\mathcal{X} p(x) \text{d}x - \sum_{i=1}^d \gamma_i \bigg( \int_\mathcal{X} p(x)\phi_i (x) \text{d}x - \alpha_i\bigg)
\end{aligned}
$$


Computing the functional derivative yields


$$
\begin{aligned}
\frac{\delta}{\delta p(x)} \mathcal{L}(p, \lambda, (\gamma_i)_i) &= -1 - p(x) - \lambda - \sum_{i=1}^d \gamma_i \phi_i(x) \\
&\overset{!}{=} 0.
\end{aligned}
$$


Thus, we have $p(x) = \exp(- \lambda  - \sum_{i=1}^d \gamma_i \phi_i(x)  - 1).$ Let's define 


$$
\mathcal{P} := \{ \hat{p}_X: \mathbb{E}_{\hat p_X}[\phi_i] = \alpha_i, \forall i \in \{ 1, \dots,  d \} \}
$$



$$
\begin{aligned}
H(\hat{p}_X) &=  - \int_\mathcal{X} \hat{p}(x) \log \hat p(x) \text{d}x \\
&=- \int_\mathcal{X} \hat{p}(x) \log \hat p(x) \frac{p(x)}{p(x)} \text{d}x \\
&=\underbrace{\int_\mathcal{X} \hat{p}(x) \log  \frac{\hat{p}(x)}{p(x)} \text{d}x}_{-D_\text{KL}(\hat p_X \| p_X)}  - \int_\mathcal{X} \hat{p}(x)\log p(x) \text{d}x  \\&= D_\text{KL}(\hat p_X \| p_X)  - \int_\mathcal{X}  \hat{p}(x)\log p(x) \text{d}x 
\\&\overset{(\star)}{\le} -\int_\mathcal{X}  \hat{p}(x)\log p(x) \text{d}x
\\&=  - \bigg[ - \lambda \int_\mathcal{X} \hat{p}(x) \text{d}x - \sum_{i=1}^d \bigg( \int_\mathcal{X} \hat{p}(x) \gamma_i \phi_i(x) \text{d}x \bigg) - \int_\mathcal{X} \hat{p}(x) \bigg ] 
\\&= - \bigg [-\lambda \int_\mathcal{X} p(x) \text{d}x - \sum_{i=1}^d \bigg( \int_\mathcal{X} p (x) \gamma_i \phi_i(x) \text{d}x \bigg) - \int_\mathcal{X} p(x) \bigg]
\\&= - \bigg[ \int_\mathcal{X} p(x) \underbrace{\bigg(-\lambda - \sum_{i=1}^d \gamma_i \phi_i (x) - 1 \bigg)}_{=\log(p(x))} \text{d}x \bigg ]\\
&= H(p_X).
\end{aligned}
$$

# Appendix

While writing this article, I have consulted the resources below:

1. [John Duchi's  Lecture Notes on Statistics 311/Electrical Engineering 377](https://web.stanford.edu/class/stats311/lecture-notes.pdf) 
2. [Sam Finlayson's blog](https://sgfin.github.io)
3. [Aarti Singh and Min Xu's Lecture Note: Maximum Entropy Distributions and Exponential Family](http://www.cs.cmu.edu/~aarti/Class/10704/lec4-maxent2.pdf).

On a side note, there are also an interesting connection between [MaxEnt and maximum likelihood](https://jihongju.github.io/2019/08/24/ml-me-duality/), which I leave for exploring in the future.