---
path: "/blog/2020-exponential-famility-distributions"
date: "2019-05-04"
title: "Exponential Family Distributions"
---

Exponential family is a large class of probabilistic distributions, both discrete and continuous. Some of these distributions include Gaussian and Bernouli distributions. As the name suggested, distributions in this famility are in a generic exponential form. 

Consider $X$ a random variable from a exponential family distribution. Its probability mass function (if $X$ is discrete) or probability density function (if it continuous) is written as 
$$
p(x|\theta) = f(x) \exp( \eta(\theta) \cdot \phi x + g(\theta)),
$$
where
- $f(x)$ is ...;
- $\theta$  is the parameter(s) of the distribution;
- $\phi(x)$ is $X$'s sufficient statistic(s);
- $\eta(\theta)$ is the natural parameter(s) of the distribution;
- $g(\theta)$ is the log-partition function, which act as a normalizer:

$$
\begin{aligned}
p(x|\theta) &= \frac{p(x| \theta)}{ \int p(x| \theta) \text{dx}} \\
&= \frac{ \cancel{g(\theta)} \exp(\eta(\theta)\cdot x) }{ \cancel{g(\theta)} \int f(x) \exp(\eta(\theta)\cdot x) }.
\end{aligned}
$$

## Example Distributions

### Bernoulli Distribution
Bernoulli distribution has one paramerter, called $p \in [0, 1]$. Its sample space $\Omega = \{0, 1\}$, e.g. coin tossing. Its probablity mass function is usally written in the following form:

$$
p(x|p) = p^x (1-p)^{1-x}.
$$

We can rewrite the above equation using the exponential-logarithm trick:
$$
\begin{aligned}
p(x|p) &= \exp(\log p^x + \log (1-p)^{(1-x)}) \\
&= \exp(x\log p + (1-x)\log (1-p)) \\
&= \exp(x\log p -x\log (1-p) + \log (1-p))\\
&= \exp\bigg(x\log \frac{p}{(1-p)} + \log (1-p)\bigg).
\end{aligned}
$$
So, we can conclude the followings:
- $f(x) = 1$;
- $\phi(x) = x$;
- $\eta(p) = \log \bigg( \frac{p}{1-p} \bigg)$;
- $g(p) = \log (1-p)$.

### Gaussian Distribution
Let's turn to an exponential family distribution for continuous random variables. The most important one is the Gaussian distribution. For univariate settings, i.e. $x \in \Reals$, the density is
$$
\begin{aligned}
p(x| \mu, \sigma^2) &= \frac{1}{\sqrt{2\pi\sigma^2}}\exp \bigg(-\frac{(x-\mu)^2}{2\sigma^2}\bigg) \\
&= \frac{1}{\sqrt{2\pi\sigma^2}} \exp \bigg(-\frac{(x^2 -2x\mu+\mu^2)}{2\sigma^2}\bigg) \\
&= \frac{1}{\sqrt{2\pi}} \exp \bigg( \frac{x\mu}{\sigma^2} -\frac{x^2}{2\sigma^2} - \frac{\mu^2}{2\sigma^2 }- \log \sigma  \bigg),
\end{aligned}
$$

where 
- $f(x) = \frac{1}{\sqrt{2\pi}}$;
- $\phi(x) = (x, x^2)^T$
- $\eta(\bf \theta) = (\frac{\mu}{\sigma^2}, -\frac{1}{\sigma^2} )^T$;
- $g(\bf \theta) = - \frac{\mu^2}{2\sigma^2} - \log \sigma$.


## Cumulant: Moment Generating Function
Let $\eta = \eta(\theta)$. The cumulant $A(\eta) \equiv -g(\theta)$. TODO: write 

### Bernoulli Distribution
Let recall that $g(\theta) = \log(1-p)$ for Bernouli distributions. We have

$$
A(\eta) = -\log (1-p).
$$

After rearranging the equation, it yields
$$
p = \frac{1}{1+e^{-\eta}} \implies A(\eta) = \log(1+e^\eta).
$$

Taking the first and second derivative, we have
$$
\begin{aligned}
A'(\eta)  &= \frac{1}{1+e^{-\eta}} = p \\
A''(\eta) &= \underbrace{\bigg(\frac{1}{1+e^{-\eta}}\bigg)}_{p} \underbrace{\bigg( \frac{e^{-\eta}}{1+e^{-\eta}} \bigg)}_{1-p}.
\end{aligned}
$$

Therefore, we recover the mean $p$ and the variance $p(1-p)$ of Bernoulli distributions.

Noting, you might notice that the function transformating $\eta$ to $p$ looks familiar; indeed, his is the sigmoid function! In generalized linear models, it is the link function.

### Gaussian Distribution
Recall $g(\theta)$ of the Gaussian distribution. Let $\mathbf (\eta_1, \eta_2)^T \equiv \eta(\mathbf \theta)$ and $A(\mathbf{\eta_1, \eta_2}) = -g(\theta)$. Solving the equation, we have
$$
A(\eta_1, \eta_2) =  \frac{\eta^2_1}{4\eta_2} + \frac{1}{2}\log(-2\eta_2).
$$

We know that $\eta_1$ corresponds to $\phi(x)_1$, i.e. $x$. If we compute the partial derivative $\frac{\partial}{\partial \eta_1} A(\eta)$ and $\frac{\partial^2}{\partial \eta_1} A(\eta)$, we get
$$
\begin{aligned}
\frac{\partial}{\partial \eta_1}A(\eta_1, \eta_2) &= \frac{\eta_1}{2\eta_2} \\
&= \mu \\
\frac{\partial^2}{\partial \eta_1}A(\eta_1, \eta_2) &= \frac{1}{2\eta_2} \\
&= \sigma^2.
\end{aligned}
$$

That means we discover $X$'s truen mean (first moment) and variance (second moment).

## Acknowledgements
- Prof. Opper & Théo
- Berkeley coursenote

## References